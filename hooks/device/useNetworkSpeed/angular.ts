import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NetworkSpeedService {
  private speedSubject = new BehaviorSubject<{ downlink: number; effectiveType: string } | null>(null);
  speed$ = this.speedSubject.asObservable();

  constructor() {
    // @ts-ignore
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (conn) {
      const update = () => {
        this.speedSubject.next({
          downlink: conn.downlink,
          effectiveType: conn.effectiveType
        });
      };
      update();
      conn.addEventListener('change', update);
    }
  }
}
