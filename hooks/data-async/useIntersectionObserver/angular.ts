import { Injectable, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IntersectionService {
  observe(element: ElementRef, options?: IntersectionObserverInit): Observable<IntersectionObserverEntry> {
    return new Observable(observer => {
      const intersectionObserver = new IntersectionObserver(entries => {
        observer.next(entries[0]);
      }, options);

      intersectionObserver.observe(element.nativeElement);

      return () => intersectionObserver.disconnect();
    });
  }
}
