import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class FormService {
  constructor(private fb: FormBuilder) {}

  create(controls: any): FormGroup {
    return this.fb.group(controls);
  }
}
// Angular's ReactiveForms are already very powerful hooks-like constructs.
// This wrapper is just for parity in the collection.
