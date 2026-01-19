import { Injectable, ElementRef, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ResizeObserverService {
  constructor(private ngZone: NgZone) {}

  observe(element: ElementRef): Observable<DOMRectReadOnly> {
    return new Observable(observer => {
      const resizeObserver = new ResizeObserver(entries => {
        this.ngZone.run(() => {
          if (entries[0]) {
            observer.next(entries[0].contentRect);
          }
        });
      });

      resizeObserver.observe(element.nativeElement);

      return () => resizeObserver.disconnect();
    });
  }
}
