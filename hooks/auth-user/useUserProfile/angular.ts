import { Injectable } from '@angular/core';
import { AuthService } from '../useAuth/angular';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
  constructor(private auth: AuthService) {}

  get profile$() {
    return this.auth.user$;
  }

  getField(key: string) {
    return this.auth.user$.pipe(map(u => u ? u[key] : null));
  }
}
