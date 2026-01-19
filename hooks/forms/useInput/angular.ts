import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class InputService {
  create(initialValue: string = ''): FormControl {
    return new FormControl(initialValue);
  }
}
