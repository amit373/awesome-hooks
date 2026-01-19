import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class DarkModeService {
  private _darkMode = new BehaviorSubject<boolean>(false);
  public darkMode$ = this._darkMode.asObservable();

  constructor(@Inject(DOCUMENT) private document: Document) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this._darkMode.next(prefersDark);
  }

  toggle() {
    this.set(!this._darkMode.value);
  }

  set(value: boolean) {
    this._darkMode.next(value);
    if (value) {
      this.document.body.classList.add('dark');
    } else {
      this.document.body.classList.remove('dark');
    }
  }
}
