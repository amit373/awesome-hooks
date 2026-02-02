import { ElementRef, signal, WritableSignal } from '@angular/core';

/**
 * Track hover state for an element.
 * In Angular, use the useHoverRef directive or call useHover() with an ElementRef.
 * @param elementRef - Optional ElementRef to attach to
 * @returns Object with isHovered signal and methods to bind (or use directive)
 */
export function useHover<T extends HTMLElement = HTMLElement>(
  elementRef?: ElementRef<T>
): { isHovered: WritableSignal<boolean>; setElement: (el: T | null) => void } {
  const isHovered = signal(false);
  let currentEl: T | null = null;

  const setElement = (el: T | null) => {
    if (currentEl) {
      currentEl.removeEventListener('mouseenter', onEnter);
      currentEl.removeEventListener('mouseleave', onLeave);
    }
    currentEl = el;
    if (el) {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    }
  };

  const onEnter = () => isHovered.set(true);
  const onLeave = () => isHovered.set(false);

  if (elementRef?.nativeElement) {
    setElement(elementRef.nativeElement);
  }

  return { isHovered, setElement };
}
