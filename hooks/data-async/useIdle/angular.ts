import { Injectable, NgZone } from '@angular/core';
import { fromEvent, merge, Observable, timer } from 'rxjs';
import { switchMap, mapTo, startWith, distinctUntilChanged } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class IdleService {
  constructor(private ngZone: NgZone) {}

  idle$(timeoutMs: number): Observable<boolean> {
    const events = ['mousemove', 'keydown', 'wheel', 'touchstart'];
    const activity$ = merge(...events.map(e => fromEvent(window, e)));

    return activity$.pipe(
      startWith(null),
      switchMap(() => 
        timer(timeoutMs).pipe(mapTo(true), startWith(false))
      ),
      distinctUntilChanged()
    );
  }
}
