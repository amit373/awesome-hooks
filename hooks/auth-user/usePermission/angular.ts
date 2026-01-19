import { Injectable } from '@angular/core';
import { AuthService } from '../useAuth/angular';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PermissionService {
  constructor(private auth: AuthService) {}

  hasPermission(permission: string) {
    return this.auth.user$.pipe(
      map(user => user && user.permissions && user.permissions.includes(permission))
    );
  }
}
