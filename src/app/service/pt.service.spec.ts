import { TestBed } from '@angular/core/testing';

import { PtServiceService } from './pt.service';

describe('PtServiceService', () => {
  let service: PtServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PtServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
