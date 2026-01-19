import { Injectable } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DebounceService {
  public debounce<T>(source$: Observable<T>, delay: number): Observable<T> {
    return source$.pipe(
      debounceTime(delay),
      distinctUntilChanged()
    );
  }
}
