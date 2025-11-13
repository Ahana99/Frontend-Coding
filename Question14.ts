/**
 * You have a reactive form with a subscription checkbox and a nested plan group (type and price). Make plan required only if       subscription is checked.
    Expected:
    - If subscription is true → plan.type and plan.price required.
    - If false → plan optional.
 */

this.form = this.fb.group({
  subscription: [false],
  plan: this.fb.group({
    type: [''],
    price: ['']
  })
});

// Add conditional validator
this.form.get('subscription')?.valueChanges.subscribe((sub: boolean) => {
    if(sub){
        this.form.get(plan)?.get('type')?.setValidators(Validators.required);
        this.form.get(plan)?.get('price')?.setValidators(Validators.required);
    }
    else{
        this.form.get(plan)?.get('type')?.clearValidators();
        this.form.get(plan)?.get('price')?.clearValidators();
    }
    this.form.get('plan')?.get('type')?.updateValueAndValidity();
    this.form.get('plan')?.get('price')?.updateValueAndValidity();
});