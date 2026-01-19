import { ElementRef, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FocusService {
  focus(el: ElementRef) {
    if (el && el.nativeElement) {
      el.nativeElement.focus();
    }
  }

  // Tracking focus state is typically done via (focus) and (blur) bindings in the template
}
