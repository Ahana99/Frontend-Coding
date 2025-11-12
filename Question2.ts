/**
 * Problem:

    You are building a generic data service in Angular that can handle fetching data for any entity (like users, products, orders). Requirements:
        - The service should be generic, so it can fetch T[] for any type T.
        - The service should cache results per entity type, so multiple calls for the same entity don’t hit the API again.
        - If a new request comes while the previous one is still pending, it should return the same pending observable (no duplicate API calls).
        - Use RxJS to handle caching and pending requests.
        - Demonstrate its usage in a component fetching users.
 */


/**
 ******************* product.component.ts *******************
*/

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AdvancedDataService } from './advanced-data.service';

interface Product {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-product',
  template: `
    <ul>
      <li *ngFor="let product of products$ | async">{{ product.name }} - ${{ product.price }}</li>
    </ul>
  `
})
export class ProductComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(private dataService: AdvancedDataService<Product>) {}

  ngOnInit() {
    this.products$ = this.dataService.fetch('products', 'https://api.example.com/products');
  }
}


/**
 ******************* advanced-data.service.ts *******************
*/

import { Injectable, Optional, SkipSelf } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, shareReplay, finalize, retryWhen, scan, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root' // default singleton
})
export class AdvancedDataService<T> {

  private cache = new Map<string, T[]>();           // Completed API results
  private pendingRequests = new Map<string, Observable<T[]>>(); // Ongoing requests

  constructor(private http: HttpClient,
              @Optional() @SkipSelf() private parentService?: AdvancedDataService<T>) {
    // DI hierarchy:
    // If a lazy-loaded module provides a new instance, it can override root
    // Otherwise, root singleton is used
  }

  fetch(entity: string, url: string): Observable<T[]> {
    // Check cache first
    if (this.cache.has(entity)) {
      return of(this.cache.get(entity)!);
    }

    // Check pending request
    if (this.pendingRequests.has(entity)) {
      return this.pendingRequests.get(entity)!;
    }

    // Create HTTP request observable
    const request$ = this.http.get<T[]>(url).pipe(
      // Retry failed requests up to 2 times with exponential backoff
      retryWhen((errors: Observable<any>) =>
        errors.pipe(
          scan((retryCount: number, err: any) => {
            if (retryCount >= 2) {
              throw err; // fail after 2 retries
            }
            return retryCount + 1;
          }, 0),
          delay((retryCount: number) => Math.pow(2, retryCount) * 500) // 500ms, 1s, 2s
        )
      ),
      tap((data: T[]) => this.cache.set(entity, data)),   // Cache successful results
      finalize(() => this.pendingRequests.delete(entity)), // Remove pending request
      shareReplay(1)                                // Share observable for multiple subscribers
    );

    // Store pending request
    this.pendingRequests.set(entity, request$);

    return request$;
  }
}
