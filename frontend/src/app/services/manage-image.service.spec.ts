import { TestBed } from '@angular/core/testing';

import { ManageImageService } from './manage-image.service';

describe('ManageImageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageImageService = TestBed.get(ManageImageService);
    expect(service).toBeTruthy();
  });
});
