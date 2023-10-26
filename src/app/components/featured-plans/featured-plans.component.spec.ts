import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedPlansComponent } from './featured-plans.component';

describe('FeaturedPlansComponent', () => {
  let component: FeaturedPlansComponent;
  let fixture: ComponentFixture<FeaturedPlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturedPlansComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
