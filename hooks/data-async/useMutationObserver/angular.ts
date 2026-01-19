import { Injectable, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MutationObserverService {
  observe(element: ElementRef, options?: MutationObserverInit): Observable<MutationRecord[]> {
    return new Observable(observer => {
      const mutationObserver = new MutationObserver(mutations => {
        observer.next(mutations);
      });

      mutationObserver.observe(element.nativeElement, options || {
        attributes: true,
        childList: true,
        subtree: true
      });

      return () => mutationObserver.disconnect();
    });
  }
}
