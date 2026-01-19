import { Injectable, NgZone } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class WindowSizeService {
  constructor(private ngZone: NgZone) {}

  get size$() {
    return fromEvent(window, 'resize').pipe(
      startWith({ target: window }),
      debounceTime(100),
      map(() => ({
        width: window.innerWidth,
        height: window.innerHeight
      }))
    );
  }
}
