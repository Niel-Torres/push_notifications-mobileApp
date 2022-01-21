import { TestBed } from '@angular/core/testing';

import { GlobalProvider } from './global.provider';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('(4) GlobalProvider', () => {
  let service: GlobalProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        {provide: HttpClient}
      ]
    });
    service = TestBed.inject(GlobalProvider);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
