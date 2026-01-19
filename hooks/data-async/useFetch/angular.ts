import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FetchService {
  constructor(private http: HttpClient) {}

  get<T>(url: string, options?: any): Observable<T> {
    return this.http.get<T>(url, options);
  }
}
