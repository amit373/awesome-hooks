import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PreviousService<T> {
  private _previous: T | undefined;
  private _current: T | undefined;

  update(value: T) {
    this._previous = this._current;
    this._current = value;
  }

  get previous(): T | undefined {
    return this._previous;
  }
}
