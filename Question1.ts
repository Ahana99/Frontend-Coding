/**
 * Problem:

    You are building a live search component in Angular. Users type into an input field, and you fetch search results from an API. To optimize performance:
        - Only the latest typed input should trigger the API call.
        - Previous pending API calls should be canceled.
        - The component should display no more than 5 results.

    Task:
    Implement the Angular component code (TypeScript part) using RxJS operators to handle the live search. Assume searchService.search(term: string): Observable<string[]> exists.
 */

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { SearchService } from './search.service';

@Component({
  selector: 'app-live-search',
  templateUrl: './live-search.component.html',
  styleUrls: ['./live-search.component.css']
})
export class LiveSearchComponent implements OnInit {

  searchControl = new FormControl('');
  results$: Observable<string[]>;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.results$ = this.searchControl.valueChanges.pipe(
      debounceTime(300),               // wait 300ms after the last keystroke
      distinctUntilChanged(),          // ignore if the next value is the same as previous
      switchMap((term: string) => this.searchService.search(term)), // cancel previous API calls
      map((results: string[]) => results.slice(0, 5))  // limit results to max 5 items
    );
  }
}
