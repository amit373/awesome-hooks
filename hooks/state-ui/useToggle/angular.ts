import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleService {
  private _value = new BehaviorSubject<boolean>(false);
  public value$ = this._value.asObservable();

  init(initialValue: boolean = false) {
    this._value.next(initialValue);
  }

  toggle(nextValue?: boolean) {
    if (typeof nextValue === 'boolean') {
      this._value.next(nextValue);
    } else {
      this._value.next(!this._value.value);
    }
  }
}
