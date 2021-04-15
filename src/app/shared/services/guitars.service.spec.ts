import { TestBed } from '@angular/core/testing';

import { GuitarsService } from './guitars.service';

describe('GuitarsService', () => {
  let service: GuitarsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuitarsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
