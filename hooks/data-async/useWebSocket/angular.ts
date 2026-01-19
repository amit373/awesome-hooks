import { Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WebSocketService {
  private socket$!: WebSocketSubject<any>;

  connect(url: string): WebSocketSubject<any> {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = webSocket(url);
    }
    return this.socket$;
  }

  send(msg: any) {
    this.socket$.next(msg);
  }
}
