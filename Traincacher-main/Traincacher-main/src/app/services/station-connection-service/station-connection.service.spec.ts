import { TestBed } from '@angular/core/testing';

import { StationConnectionService } from './station-connection.service';

describe('StationConnectionService', () => {
  let service: StationConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StationConnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('randomtest', () => {
    expect(true).toBe(false);
  });
});
