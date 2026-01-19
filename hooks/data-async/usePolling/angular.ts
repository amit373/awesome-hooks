import { Injectable } from '@angular/core';
import { interval, switchMap, Observable, timer, retry } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PollingService {
  poll<T>(request$: Observable<T>, period: number): Observable<T> {
    return timer(0, period).pipe(
      switchMap(() => request$),
      retry()
    );
  }
}
