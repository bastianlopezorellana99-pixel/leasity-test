import { TestBed } from '@angular/core/testing';

import { SignalFormService } from './signal-form.service';

describe('SignalFormService', () => {
  let service: SignalFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignalFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
