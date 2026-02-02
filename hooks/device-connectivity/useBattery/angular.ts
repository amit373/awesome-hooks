import { Injectable, OnDestroy, signal } from '@angular/core';

interface BatteryState {
  level: number | null;
  charging: boolean | null;
  chargingTime: number | null;
  dischargingTime: number | null;
}

interface UseBatteryReturn {
  isSupported: boolean;
  battery: BatteryState | null;
  error: Error | null;
}

/**
 * An Angular service for monitoring battery status
 * @returns Battery state information and support status
 */
@Injectable({ providedIn: 'root' })
export class BatteryService implements OnDestroy {
  private batteryStateSignal = signal<BatteryState | null>(null);
  private isSupportedSignal = signal(true);
  private errorSignal = signal<Error | null>(null);

  readonly batteryState$ = this.batteryStateSignal.asReadonly();
  readonly isSupported$ = this.isSupportedSignal.asReadonly();
  readonly error$ = this.errorSignal.asReadonly();

  private battery: any = null;

  constructor() {
    if (!('getBattery' in navigator)) {
      this.isSupportedSignal.set(false);
      this.errorSignal.set(new Error('Battery Status API not supported'));
    } else {
      const handleBatteryUpdate = () => {
        if (this.battery) {
          this.batteryStateSignal.set({
            level: this.battery.level,
            charging: this.battery.charging,
            chargingTime: this.battery.chargingTime,
            dischargingTime: this.battery.dischargingTime,
          });
        }
      };

      (navigator as any)
        .getBattery()
        .then((bat: any) => {
          this.battery = bat;

          this.batteryStateSignal.set({
            level: this.battery.level,
            charging: this.battery.charging,
            chargingTime: this.battery.chargingTime,
            dischargingTime: this.battery.dischargingTime,
          });

          this.battery.addEventListener('levelchange', handleBatteryUpdate);
          this.battery.addEventListener('chargingchange', handleBatteryUpdate);
          this.battery.addEventListener(
            'chargingtimechange',
            handleBatteryUpdate
          );
          this.battery.addEventListener(
            'dischargingtimechange',
            handleBatteryUpdate
          );
        })
        .catch((err: any) => {
          this.errorSignal.set(
            err instanceof Error ? err : new Error(String(err))
          );
          this.isSupportedSignal.set(false);
        });
    }
  }

  ngOnDestroy(): void {
    if (this.battery) {
      this.battery.removeEventListener('levelchange', () => {});
      this.battery.removeEventListener('chargingchange', () => {});
      this.battery.removeEventListener('chargingtimechange', () => {});
      this.battery.removeEventListener('dischargingtimechange', () => {});
    }
  }
}

/**
 * Factory function to create a BatteryService instance
 * @returns Battery state information and support status
 */
export function useBattery(): UseBatteryReturn {
  const service = new BatteryService();

  return {
    get isSupported() {
      return service.isSupported$();
    },
    get battery() {
      return service.batteryState$();
    },
    get error() {
      return service.error$();
    },
  };
}
