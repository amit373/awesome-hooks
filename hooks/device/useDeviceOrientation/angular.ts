import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DeviceOrientationService {
  orientation$ = fromEvent<DeviceOrientationEvent>(window, 'deviceorientation').pipe(
    map(event => ({
      alpha: event.alpha,
      beta: event.beta,
      gamma: event.gamma
    }))
  );
}
