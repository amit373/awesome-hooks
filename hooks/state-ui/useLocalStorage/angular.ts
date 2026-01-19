import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService<T> {
  private _value = new BehaviorSubject<T | null>(null);
  public value$ = this._value.asObservable();
  private key: string = '';

  init(key: string, initialValue: T) {
    this.key = key;
    try {
      const item = window.localStorage.getItem(key);
      this._value.next(item ? JSON.parse(item) : initialValue);
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      this._value.next(initialValue);
    }
  }

  setValue(value: T) {
    try {
      this._value.next(value);
      window.localStorage.setItem(this.key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Error setting localStorage key "${this.key}":`, error);
    }
  }
}
