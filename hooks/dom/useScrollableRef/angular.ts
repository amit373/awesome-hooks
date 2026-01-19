import { Injectable, ElementRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollableService {
  isScrollable(el: ElementRef): boolean {
    if (!el || !el.nativeElement) return false;
    return el.nativeElement.scrollHeight > el.nativeElement.clientHeight;
  }
}
