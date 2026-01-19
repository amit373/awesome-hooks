import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class RadioService {
  create(initialValue: string = ''): FormControl {
    return new FormControl(initialValue);
  }
}
