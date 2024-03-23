import { TestBed } from '@angular/core/testing';

import { DataService } from './get-data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GetDataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
