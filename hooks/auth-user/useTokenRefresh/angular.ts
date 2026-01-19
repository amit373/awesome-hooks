import { Injectable, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { AuthService } from '../useAuth/angular';

@Injectable({ providedIn: 'root' })
export class TokenRefreshService implements OnDestroy {
  private sub?: Subscription;

  constructor(private auth: AuthService) {}

  start(refreshFn: () => Promise<string>, intervalMs: number = 900000) {
    this.stop();
    this.sub = interval(intervalMs).pipe(
      filter(() => this.auth.isAuthenticated),
    ).subscribe(async () => {
      try {
        await refreshFn();
      } catch (e) {
        console.error('Refresh failed', e);
      }
    });
  }

  stop() {
    this.sub?.unsubscribe();
  }

  ngOnDestroy() {
    this.stop();
  }
}
