import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AnimationFrameService implements OnDestroy {
  private frameSubject = new Subject<number>();
  frame$ = this.frameSubject.asObservable();
  private requestID: number | null = null;
  private previousTime: number | undefined;

  constructor(private ngZone: NgZone) {}

  start() {
    this.ngZone.runOutsideAngular(() => {
      const animate = (time: number) => {
        if (this.previousTime !== undefined) {
          const deltaTime = time - this.previousTime;
          this.ngZone.run(() => this.frameSubject.next(deltaTime));
        }
        this.previousTime = time;
        this.requestID = requestAnimationFrame(animate);
      };
      this.requestID = requestAnimationFrame(animate);
    });
  }

  stop() {
    if (this.requestID) {
      cancelAnimationFrame(this.requestID);
      this.requestID = null;
      this.previousTime = undefined;
    }
  }

  ngOnDestroy() {
    this.stop();
  }
}
