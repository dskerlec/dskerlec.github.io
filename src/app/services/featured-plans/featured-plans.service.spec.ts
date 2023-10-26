import { TestBed } from '@angular/core/testing';

import { FeaturedPlansService } from './featured-plans.service';

describe('FeaturedPlansService', () => {
  let service: FeaturedPlansService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeaturedPlansService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
