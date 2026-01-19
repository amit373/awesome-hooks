import { Injectable, ElementRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FadeInService {
  observe(element: ElementRef, duration: number = 500, delay: number = 0) {
    const el = element.nativeElement;
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity ${duration}ms ease-in-out, transform ${duration}ms ease-in-out`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
  }
}
