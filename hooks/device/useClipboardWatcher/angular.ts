import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClipboardWatcherService {
  private contentSubject = new BehaviorSubject<string>('');
  content$ = this.contentSubject.asObservable();

  constructor(private ngZone: NgZone) {
    this.ngZone.runOutsideAngular(() => {
      setInterval(async () => {
        try {
          const text = await navigator.clipboard.readText();
          if (text !== this.contentSubject.value) {
            this.ngZone.run(() => this.contentSubject.next(text));
          }
        } catch (e) {}
      }, 1000);
    });
  }
}
