import { Injectable, NgZone } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { map, startWith, throttleTime } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ScrollPositionService {
  constructor(private ngZone: NgZone) {}

  get position$() {
    return fromEvent(window, 'scroll').pipe(
      throttleTime(20), // Performance optimization
      map(() => ({ x: window.scrollX, y: window.scrollY })),
      startWith({ x: window.scrollX, y: window.scrollY })
    );
  }
}
