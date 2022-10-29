import { TestBed } from '@angular/core/testing';

import { SupplierCategoryService } from './supplier-category.service';

describe('SupplierCategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SupplierCategoryService = TestBed.get(SupplierCategoryService);
    expect(service).toBeTruthy();
  });
});
