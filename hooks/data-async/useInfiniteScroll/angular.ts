import { Injectable, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InfiniteScrollService {
  private observer: IntersectionObserver | null = null;
  public scrolled$ = new Subject<void>();

  observe(element: ElementRef) {
    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.scrolled$.next();
      }
    });
    this.observer.observe(element.nativeElement);
  }

  disconnect() {
    this.observer?.disconnect();
  }
}
