import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService<T> {
  private _value = new BehaviorSubject<T | null>(null);
  public value$ = this._value.asObservable();
  private key: string = '';

  init(key: string, initialValue: T) {
    this.key = key;
    try {
      const item = window.sessionStorage.getItem(key);
      this._value.next(item ? JSON.parse(item) : initialValue);
    } catch (error) {
      console.warn(`Error reading sessionStorage key "${key}":`, error);
      this._value.next(initialValue);
    }
  }

  setValue(value: T) {
    try {
      this._value.next(value);
      window.sessionStorage.setItem(this.key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Error setting sessionStorage key "${this.key}":`, error);
    }
  }
}
