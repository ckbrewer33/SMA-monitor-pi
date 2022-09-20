import { TestBed } from '@angular/core/testing';

import { SmaService } from './sma.service';

describe('SmaService', () => {
  let service: SmaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
