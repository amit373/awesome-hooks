import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MediaQueryService {
  constructor(private ngZone: NgZone) {}

  match(query: string): Observable<boolean> {
    const mediaQuery = window.matchMedia(query);
    return new Observable<boolean>(observer => {
      const handler = (e: MediaQueryListEvent | MediaQueryList) => this.ngZone.run(() => observer.next(e.matches));
      handler(mediaQuery);
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }).pipe(distinctUntilChanged());
  }
}
