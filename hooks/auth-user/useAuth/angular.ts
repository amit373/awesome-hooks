import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  login(userData: any) {
    this.userSubject.next(userData);
  }

  logout() {
    this.userSubject.next(null);
  }

  get isAuthenticated(): boolean {
    return !!this.userSubject.value;
  }
}
