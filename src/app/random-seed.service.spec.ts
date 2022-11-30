import { TestBed } from '@angular/core/testing';

import { RandomSeedService } from './random-seed.service';

describe('RandomSeedService', () => {
  let service: RandomSeedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomSeedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
