import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FileUploadService {
  handleFile(file: File): Observable<string | ArrayBuffer | null> {
    const result = new Subject<string | ArrayBuffer | null>();
    const reader = new FileReader();
    reader.onload = (e) => {
      result.next(e.target?.result ?? null);
      result.complete();
    };
    reader.readAsDataURL(file);
    return result.asObservable();
  }
}
