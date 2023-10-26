import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { IPlan } from 'src/app/interfaces/IPlan.interface';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeaturedPlansService {
  private _plansUrl = 'assets/featured-plans.json';

  constructor(private _http: HttpClient) {}

  getFeaturedPlans(): Observable<any> {
    return new Observable((observer) => {
      this._http.get(this._plansUrl).pipe(
        map((res:any) => {
          observer.next(res as IPlan[]);
          observer.complete();
        })
      ).subscribe();
    })
  
  }
}
