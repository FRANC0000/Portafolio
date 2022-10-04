import { TestBed } from '@angular/core/testing';

import { BodegaService } from './bodega.service';

describe('BodegaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BodegaService = TestBed.get(BodegaService);
    expect(service).toBeTruthy();
  });
});
