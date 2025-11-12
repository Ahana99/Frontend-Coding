/**
 * You have a reactive form with a username field. Implement a validator method noAdmin that prevents the username "admin".

    Expected:
    - username = "admin" → validation fails
    - Any other value → validation passes
 */

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, this.noAdmin]]
    });
  }

  noAdmin(control: AbstractControl): ValidationErrors | null {
    if(control.value === 'admin'){
        return {noAdmin: true};
    }
    return null;
  }
}
