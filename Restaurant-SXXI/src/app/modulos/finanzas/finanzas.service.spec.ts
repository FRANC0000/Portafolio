import { TestBed } from '@angular/core/testing';

import { FinanzasService } from './finanzas.service';

describe('FinanzasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FinanzasService = TestBed.get(FinanzasService);
    expect(service).toBeTruthy();
  });
});
