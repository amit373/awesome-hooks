import { DestroyRef, inject } from '@angular/core';

/**
 * Angular function that fires a callback when a click occurs outside the specified element
 * @param callback - Function to call when click outside occurs
 * @returns Element reference to attach to the element to watch
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  callback: () => void
) {
  let element: T | null = null;
  const destroyRef = inject(DestroyRef);

  const handleClickOutside = (event: MouseEvent) => {
    if (element && !element.contains(event.target as Node)) {
      callback();
    }
  };

  // Set up event listener
  document.addEventListener('mousedown', handleClickOutside);

  // Clean up on component destruction
  destroyRef.onDestroy(() => {
    document.removeEventListener('mousedown', handleClickOutside);
  });

  return {
    set element(value: T | null) {
      element = value;
    },
    get element(): T | null {
      return element;
    },
  };
}
