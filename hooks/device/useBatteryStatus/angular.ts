import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BatteryService {
  private batterySubject = new BehaviorSubject<any>(null);
  battery$ = this.batterySubject.asObservable();

  constructor() {
    // @ts-ignore
    if (navigator.getBattery) {
      // @ts-ignore
      navigator.getBattery().then((bat: any) => {
        const update = () => {
          this.batterySubject.next({
            charging: bat.charging,
            level: bat.level,
            chargingTime: bat.chargingTime,
            dischargingTime: bat.dischargingTime
          });
        };
        update();
        bat.addEventListener('levelchange', update);
        bat.addEventListener('chargingchange', update);
      });
    }
  }
}
