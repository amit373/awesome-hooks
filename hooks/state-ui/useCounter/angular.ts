import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  private _count = new BehaviorSubject<number>(0);
  public count$ = this._count.asObservable();
  
  private initialValue = 0;
  private min?: number;
  private max?: number;

  init(initialValue = 0, options: { min?: number, max?: number } = {}) {
    this.initialValue = initialValue;
    this.min = options.min;
    this.max = options.max;
    this._count.next(initialValue);
  }

  get value() {
    return this._count.value;
  }

  increment() {
    const next = this.value + 1;
    if (this.max !== undefined && next > this.max) return;
    this._count.next(next);
  }

  decrement() {
    const next = this.value - 1;
    if (this.min !== undefined && next < this.min) return;
    this._count.next(next);
  }

  set(value: number) {
    this._count.next(value);
  }

  reset() {
    this._count.next(this.initialValue);
  }
}
