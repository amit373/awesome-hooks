import { Injectable, OnDestroy, signal } from '@angular/core';

interface MousePosition {
  x: number;
  y: number;
}

/**
 * An Angular service for tracking mouse position
 * @returns Object containing x and y coordinates of the mouse
 */
@Injectable({ providedIn: 'root' })
export class MousePositionService implements OnDestroy {
  private positionSignal = signal<{ x: number; y: number }>({ x: 0, y: 0 });

  readonly position$ = this.positionSignal.asReadonly();

  constructor() {
    const handleMouseMove = (event: MouseEvent) => {
      this.positionSignal.set({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Store reference to cleanup function
    const originalDestroy = this.ngOnDestroy;
    this.ngOnDestroy = () => {
      originalDestroy.call(this);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }

  ngOnDestroy(): void {
    // Cleanup handled in constructor assignment
  }
}

/**
 * Factory function to create a MousePositionService instance
 * @returns Object containing x and y coordinates of the mouse
 */
export function useMousePosition(): MousePosition {
  const service = new MousePositionService();
  return service.position$();
}
