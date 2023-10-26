import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IPlan } from 'src/app/interfaces/IPlan.interface';
import { FeaturedPlansService } from 'src/app/services/featured-plans/featured-plans.service';

@Component({
  selector: 'app-featured-plans',
  templateUrl: './featured-plans.component.html',
  styleUrls: ['./featured-plans.component.scss']
})
export class FeaturedPlansComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject();

  featuredTitle = "Featured Plans";
  featuredPlans: IPlan[] = [];

  constructor(private _featuredPlansService: FeaturedPlansService) { }

  ngOnInit(): void {
    this.getFeaturedPlans();
  }

  getFeaturedPlans() {
    this._featuredPlansService.getFeaturedPlans().pipe(
      takeUntil(this.destroy$),
    ).subscribe({
      next: (res: any) => {
        this.featuredPlans = res;
      },
      error: (err: any) => {
        console.error('An Error has occured: ', err);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
