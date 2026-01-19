import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class CheckboxService {
  create(initialValue: boolean = false): FormControl {
    return new FormControl(initialValue);
  }
}
