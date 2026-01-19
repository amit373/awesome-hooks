import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidationService {
  createValidator(validatorFn: (value: any) => string | null): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const error = validatorFn(control.value);
      return error ? { custom: error } : null;
    };
  }
}
