import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ImageLoaderService {
  load(src: string): Observable<boolean> {
    const subject = new Subject<boolean>();
    const img = new Image();
    img.src = src;
    img.onload = () => {
      subject.next(true);
      subject.complete();
    };
    img.onerror = () => {
      subject.error(new Error(`Failed to load ${src}`));
    };
    return subject.asObservable();
  }
}
