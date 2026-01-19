import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AlertService {
  private alertSubject = new BehaviorSubject<{ message: string; type: string } | null>(null);
  alert$ = this.alertSubject.asObservable();

  show(message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') {
    this.alertSubject.next({ message, type });
  }

  hide() {
    this.alertSubject.next(null);
  }
}
