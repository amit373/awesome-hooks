import { Injectable, ElementRef } from '@angular/core';
import { fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class HoverService {
  // Usually this is done via (mouseenter) and (mouseleave) in template
  // But to be consistent with "hook" style:
  observe(element: ElementRef): Observable<boolean> {
    const enter$ = fromEvent(element.nativeElement, 'mouseenter').pipe(map(() => true));
    const leave$ = fromEvent(element.nativeElement, 'mouseleave').pipe(map(() => false));
    return merge(enter$, leave$);
  }
}
