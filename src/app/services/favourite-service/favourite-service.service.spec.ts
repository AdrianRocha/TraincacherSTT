import { TestBed } from '@angular/core/testing';

import { FavouriteService } from './favourite-service.service';

describe('FavouriteServiceService', () => {
  let service: FavouriteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavouriteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
