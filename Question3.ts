/**
 * Problem:
Create an Angular component with an input field that reverses the text as the user types and displays it below in real-time.
    Requirements:
        - Use FormControl
        - Update reversed text reactively
 */

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-reverse-text',
  template: `
    <input [formControl]="textControl" placeholder="Type something"/>
    <p>Reversed: {{ reversedText$ | async }}</p>
  `
})
export class ReverseTextComponent implements OnInit {
  textControl = new FormControl('');
  reversedText$ = this.textControl.valueChanges.pipe(
    map((text: string) => text.split('').reverse().join(''))
  );

  ngOnInit(): void {}
}
