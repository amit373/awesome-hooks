import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, from, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';

export interface AsyncState<T> {
  status: 'idle' | 'pending' | 'success' | 'error';
  value: T | null;
  error: any | null;
}

@Injectable({ providedIn: 'root' })
export class AsyncService {
  // Angular usually handles this with RxJS pipes directly in components
  // But to mimic the hook behavior:
  run<T>(promiseOrObservable: Promise<T> | Observable<T>): Observable<AsyncState<T>> {
    const obs$ = promiseOrObservable instanceof Promise ? from(promiseOrObservable) : promiseOrObservable;
    
    return obs$.pipe(
      map(value => ({ status: 'success', value, error: null } as AsyncState<T>)),
      startWith({ status: 'pending', value: null, error: null } as AsyncState<T>),
      catchError(error => of({ status: 'error', value: null, error } as AsyncState<T>))
    );
  }
}
