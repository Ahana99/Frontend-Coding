/**
 * You have a parent component that passes a user object to a child component via @Input(). Implement the child component to display the user’s name in uppercase and emit an event when a “Greet” button is clicked.
 
    Expected:
    - userName displays in uppercase whenever user changes.
    - Clicking the button emits "Hello, USERNAME" to the parent.
 */

/**
 ******************* child.component.ts *******************
*/
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <p>{{ userName }}</p>
    <button (click)="greet()">Greet</button>
  `
})
export class ChildComponent {
  @Input() user: { name: string };
  @Output() greetUser = new EventEmitter<string>();

  userName: string;

  ngOnChanges() {
    if(this.user?.name){
        this.userName = this.user.name.toUpperCase();
    }
  }

  greet() {
    this.greetUser.emit(`Hello, ${this.userName}`);
  }
}
