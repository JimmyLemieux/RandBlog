import { TestBed } from '@angular/core/testing';

import { BogEntryService } from './bog-entry.service';

describe('BogEntryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BogEntryService = TestBed.get(BogEntryService);
    expect(service).toBeTruthy();
  });
});
