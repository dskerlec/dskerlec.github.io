import { Component, Input } from '@angular/core';
import { IPlan } from 'src/app/interfaces/IPlan.interface';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent {
@Input() plan!: IPlan;

}
