import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SnackbarService {
  private snackbarSubject = new Subject<{ message: string; duration: number } | null>();
  snackbar$ = this.snackbarSubject.asObservable();

  open(message: string, duration = 6000) {
    this.snackbarSubject.next({ message, duration });
    if (duration > 0) {
      setTimeout(() => this.close(), duration);
    }
  }

  close() {
    this.snackbarSubject.next(null);
  }
}
