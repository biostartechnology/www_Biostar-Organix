import { TestBed } from '@angular/core/testing';

import { HttputilityService } from './httputility.service';

describe('HttputilityService', () => {
  let service: HttputilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttputilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
