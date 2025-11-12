/**
 * Problem:
    Implement a counter component in Angular with increment, decrement, and reset buttons.
        Requirements:
            - Use a BehaviorSubject<number> in the component
            - The template should update automatically whenever the value changes
            - Initialize counter at 0
 */

import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-counter',
  template: `
    <p>Counter: {{ counter$ | async }}</p>
    <button (click)="increment()">Increment</button>
    <button (click)="decrement()">Decrement</button>
    <button (click)="reset()">Reset</button>
  `
})
export class CounterComponent {
  private counterSubject = new BehaviorSubject<number>(0);
  counter$ = this.counterSubject.asObservable();

  increment() { this.counterSubject.next(this.counterSubject.value + 1); }
  decrement() { this.counterSubject.next(this.counterSubject.value - 1); }
  reset() { this.counterSubject.next(0); }
}
