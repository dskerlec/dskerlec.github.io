import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkoutPlansRoutingModule } from './workout-plans-routing.module';
import { WorkoutPlansComponent } from './workout-plans.component';
import { FeaturedPlansComponent } from 'src/app/components/featured-plans/featured-plans.component';
import { PlanComponent } from 'src/app/components/plan/plan.component';


@NgModule({
  declarations: [
    WorkoutPlansComponent,
    FeaturedPlansComponent,
    PlanComponent
  ],
  imports: [
    CommonModule,
    WorkoutPlansRoutingModule
  ]
})
export class WorkoutPlansModule { }
