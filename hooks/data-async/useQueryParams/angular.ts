import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class QueryParamsService {
  constructor(private route: ActivatedRoute) {}

  get params$(): Observable<any> {
    return this.route.queryParams;
  }
  
  getParam(key: string): Observable<string> {
    return this.route.queryParams.pipe(map(params => params[key]));
  }
}
