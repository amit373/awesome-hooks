import { Injectable, OnDestroy, signal } from '@angular/core';

/**
 * Angular service for tracking page visibility
 * @returns Boolean indicating if the page is currently visible
 */
@Injectable({ providedIn: 'root' })
export class PageVisibilityService implements OnDestroy {
  private isVisibleSignal = signal(true);

  readonly isVisible$ = this.isVisibleSignal.asReadonly();

  constructor() {
    if (typeof document === 'undefined') return;

    const handleVisibilityChange = () => {
      this.isVisibleSignal.set(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Clean up listener when service is destroyed
    const originalDestroy = this.ngOnDestroy;
    this.ngOnDestroy = () => {
      originalDestroy.call(this);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }

  ngOnDestroy(): void {
    // Cleanup will be handled in constructor assignment
  }
}

/**
 * Factory function to create a PageVisibilityService instance
 * @returns Boolean indicating if the page is currently visible
 */
export function usePageVisibility(): boolean {
  const service = new PageVisibilityService();
  return service.isVisible$();
}
