import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConfirmService {
  private confirmSubject = new Subject<{ message: string; resolve: (val: boolean) => void } | null>();
  confirmRequest$ = this.confirmSubject.asObservable();

  confirm(message: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.confirmSubject.next({ message, resolve });
    });
  }

  resolve(result: boolean) {
    // The component consuming confirmRequest$ is responsible for calling resolve
    // This is a placeholder for a more complex service-component interaction
  }
}
