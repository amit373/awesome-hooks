import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, fromEvent, merge, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class OnlineStatusService implements OnDestroy {
  private onlineSubject = new BehaviorSubject<boolean>(navigator.onLine);
  isOnline$ = this.onlineSubject.asObservable();
  private sub: Subscription;

  constructor() {
    this.sub = merge(
      fromEvent(window, 'online').pipe(map(() => true)),
      fromEvent(window, 'offline').pipe(map(() => false))
    ).subscribe(this.onlineSubject);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
