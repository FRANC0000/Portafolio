import { TestBed } from '@angular/core/testing';

import { CocinaService } from './cocina.service';

describe('CocinaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CocinaService = TestBed.get(CocinaService);
    expect(service).toBeTruthy();
  });
});
