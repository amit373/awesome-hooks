import { Injectable, signal } from '@angular/core';

interface UseBooleanReturn {
  value: boolean;
  toggle: () => void;
  setTrue: () => void;
  setFalse: () => void;
  setValue: (value: boolean) => void;
}

/**
 * An Angular service for managing boolean state with convenience methods
 * @param initialValue The initial boolean value
 * @returns Object with boolean value and helper methods
 */
@Injectable({ providedIn: 'root' })
export class BooleanService {
  private valueSignal = signal<boolean>(false);

  readonly value$ = this.valueSignal.asReadonly();

  constructor(initialValue: boolean = false) {
    this.valueSignal.set(initialValue);
  }

  /**
   * Toggle the boolean value
   */
  toggle(): void {
    this.valueSignal.update(prev => !prev);
  }

  /**
   * Set the boolean value to true
   */
  setTrue(): void {
    this.valueSignal.set(true);
  }

  /**
   * Set the boolean value to false
   */
  setFalse(): void {
    this.valueSignal.set(false);
  }

  /**
   * Set the boolean value to a specific value
   * @param value The new boolean value
   */
  setValue(value: boolean): void {
    this.valueSignal.set(value);
  }
}

/**
 * Factory function to create a BooleanService instance
 * @param initialValue The initial boolean value
 * @returns Object with boolean value and helper methods
 */
export function useBoolean(initialValue: boolean = false): UseBooleanReturn {
  const service = new BooleanService(initialValue);

  return {
    get value() {
      return service.value$();
    },
    toggle: () => service.toggle(),
    setTrue: () => service.setTrue(),
    setFalse: () => service.setFalse(),
    setValue: (value: boolean) => service.setValue(value),
  };
}
