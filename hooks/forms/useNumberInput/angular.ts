import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class NumberInputService {
  create(initialValue: number = 0): FormControl {
    return new FormControl(initialValue);
  }
}
