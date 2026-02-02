import { Injectable, OnDestroy, signal } from '@angular/core';

interface WindowSize {
  width: number;
  height: number;
}

/**
 * An Angular service for tracking window size
 * @returns Object containing width and height of the window
 */
@Injectable({ providedIn: 'root' })
export class WindowSizeService implements OnDestroy {
  private sizeSignal = signal<WindowSize>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  readonly size$ = this.sizeSignal.asReadonly();

  constructor() {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      this.sizeSignal.set({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    // Store reference to cleanup function
    const originalDestroy = this.ngOnDestroy;
    this.ngOnDestroy = () => {
      originalDestroy.call(this);
      window.removeEventListener('resize', handleResize);
    };
  }

  ngOnDestroy(): void {
    // Cleanup handled in constructor assignment
  }
}

/**
 * Factory function to create a WindowSizeService instance
 * @returns Object containing width and height of the window
 */
export function useWindowSize(): WindowSize {
  const service = new WindowSizeService();
  return service.size$();
}
