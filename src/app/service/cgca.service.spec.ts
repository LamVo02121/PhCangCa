import { TestBed } from '@angular/core/testing';

import { CgcaService } from './cgca.service';

describe('CgcaService', () => {
  let service: CgcaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CgcaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
