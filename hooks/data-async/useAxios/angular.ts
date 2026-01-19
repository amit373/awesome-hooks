import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Angular uses HttpClient which is already robust, but for parity:
@Injectable({ providedIn: 'root' })
export class AxiosService {
  constructor(private http: HttpClient) {}
  // Just wrapping HttpClient for the sake of the pattern
  get<T>(url: string, options?: any): Observable<T> {
    return this.http.get<T>(url, options);
  }
}
