import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class SelectService {
  create(initialValue: string = ''): FormControl {
    return new FormControl(initialValue);
  }
}
