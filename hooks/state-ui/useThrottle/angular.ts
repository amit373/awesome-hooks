import { Injectable } from '@angular/core';
import { throttleTime, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThrottleService {
  public throttle<T>(source$: Observable<T>, limit: number): Observable<T> {
    return source$.pipe(
      throttleTime(limit)
    );
  }
}
