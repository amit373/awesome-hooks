import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GeoLocationService {
  watchPosition(options?: PositionOptions): Observable<GeolocationCoordinates> {
    return new Observable(observer => {
      if (!navigator.geolocation) {
        observer.error('Geolocation not supported');
        return;
      }

      const id = navigator.geolocation.watchPosition(
        (pos) => observer.next(pos.coords),
        (err) => observer.error(err),
        options
      );

      return () => navigator.geolocation.clearWatch(id);
    });
  }
}
