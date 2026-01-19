import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class KeyboardShortcutsService implements OnDestroy {
  private sub: Subscription | null = null;

  init(shortcuts: { [key: string]: (event: KeyboardEvent) => void }) {
    this.sub = fromEvent<KeyboardEvent>(window, 'keydown').subscribe(event => {
      const key = [
        event.ctrlKey ? 'Ctrl' : '',
        event.metaKey ? 'Cmd' : '',
        event.shiftKey ? 'Shift' : '',
        event.altKey ? 'Alt' : '',
        event.key.toUpperCase(),
      ]
        .filter(Boolean)
        .join('+');

      if (shortcuts[key]) {
        event.preventDefault();
        shortcuts[key](event);
      } else if (shortcuts[event.key]) {
        shortcuts[event.key](event);
      }
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
