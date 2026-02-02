import { Injectable, OnDestroy, signal } from '@angular/core';

/**
 * An Angular service for using CSS media queries
 * @param query - CSS media query string
 * @returns Boolean indicating if query matches
 */
@Injectable({ providedIn: 'root' })
export class MediaQueryService implements OnDestroy {
  private matchesSignal = signal(false);

  readonly matches$ = this.matchesSignal.asReadonly();

  private mediaQueryList: MediaQueryList | null = null;
  private handleChange: (e: MediaQueryListEvent) => void;

  constructor(query: string) {
    this.handleChange = (e: MediaQueryListEvent) => {
      this.matchesSignal.set(e.matches);
    };

    if (typeof window !== 'undefined') {
      this.mediaQueryList = window.matchMedia(query);

      // For older browsers that don't support addEventListener
      if ('addEventListener' in this.mediaQueryList) {
        this.mediaQueryList.addEventListener('change', this.handleChange);
      } else {
        (this.mediaQueryList as any).addListener(this.handleChange);
      }

      this.matchesSignal.set(this.mediaQueryList.matches);
    }
  }

  ngOnDestroy(): void {
    if (this.mediaQueryList) {
      if ('removeEventListener' in this.mediaQueryList) {
        this.mediaQueryList.removeEventListener('change', this.handleChange);
      } else {
        (this.mediaQueryList as any).removeListener(this.handleChange);
      }
    }
  }
}

/**
 * Factory function to create a MediaQueryService instance
 * @param query - CSS media query string
 * @returns Boolean indicating if query matches
 */
export function useMediaQuery(query: string): boolean {
  const service = new MediaQueryService(query);
  return service.matches$();
}
