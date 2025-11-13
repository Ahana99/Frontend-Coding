/**
 * You have a reactive form with email and subscribe checkbox. Make email required only if subscribe is true.
 */

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html'
})
export class SubscriptionFormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      subscribe: [false],
      email: ['']
    });

    this.form.get('subscribe')?.valueChanges.subscribe((sub: boolean) => {
        const emailControl = this.form.get('email');
        if(sub){
            emailControl?.setValidators([Validators.required, Validators.email]);
        }
        else{
            emailControl.clearValidators();
        }
        emailControl?.updateValueAndValidity();
    });
  }
}
