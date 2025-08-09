import { TestBed } from '@angular/core/testing';

import { PatientApp } from './patient-app';

describe('PatientApp', () => {
  let service: PatientApp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientApp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
