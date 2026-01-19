import { Injectable } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';

type TransitionStage = 'enter' | 'active' | 'exit' | 'unmounted';

@Injectable({ providedIn: 'root' })
export class TransitionService {
  // Simple state management for transition stages
  createTransition(isActive: boolean, duration: number = 300) {
    const stage = new BehaviorSubject<TransitionStage>(isActive ? 'active' : 'unmounted');
    const shouldMount = new BehaviorSubject<boolean>(isActive);

    const toggle = (active: boolean) => {
      if (active) {
        shouldMount.next(true);
        stage.next('enter');
        setTimeout(() => stage.next('active'), 50);
      } else {
        stage.next('exit');
        timer(duration).subscribe(() => {
          shouldMount.next(false);
          stage.next('unmounted');
        });
      }
    };

    return { stage, shouldMount, toggle };
  }
}
