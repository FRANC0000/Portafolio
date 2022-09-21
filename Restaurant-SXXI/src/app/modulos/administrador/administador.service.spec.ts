import { TestBed } from '@angular/core/testing';

import { AdministadorService } from './administador.service';

describe('AdministadorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdministadorService = TestBed.get(AdministadorService);
    expect(service).toBeTruthy();
  });
});
