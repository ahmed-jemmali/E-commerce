import { TestBed } from '@angular/core/testing';

import { FactureAchatService } from './facture-achat.service';

describe('FactureAchatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FactureAchatService = TestBed.get(FactureAchatService);
    expect(service).toBeTruthy();
  });
});
