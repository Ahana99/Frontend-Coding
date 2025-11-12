/**
 * Problem:
    You have a UserService that returns an observable of users. Implement the getActiveUsers method in UserListComponent to return only users with isActive: true.

    Expected:
    activeUsers$ should emit only active users.
 */

/**
 ******************* user.model.ts *******************
*/
export interface User {
  id: number;
  name: string;
  isActive: boolean;
}

/**
 ******************* user.service.ts *******************
*/
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private users: User[] = [
    { id: 1, name: 'Alice', isActive: true },
    { id: 2, name: 'Bob', isActive: false },
    { id: 3, name: 'Charlie', isActive: true }
  ];

  getUsers(): Observable<User[]> {
    return of(this.users);
  }
}

/**
 ******************* user-list.component.ts *******************
*/
import { Component } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent {
  constructor(private userService: UserService) {}

  activeUsers$: Observable<User[]>;

  getActiveUsers() {
    this.activeUsers$ = this.userService.getUsers().pipe(
    map((users: User[]) => users.filter((user: User) => user.isActive))
  );
  }
}

