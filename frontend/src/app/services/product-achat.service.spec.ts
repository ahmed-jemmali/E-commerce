import { TestBed } from '@angular/core/testing';

import { ProductAchatService } from './product-achat.service';

describe('ProductAchatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductAchatService = TestBed.get(ProductAchatService);
    expect(service).toBeTruthy();
  });
});
