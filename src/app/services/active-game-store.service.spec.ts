import { TestBed } from '@angular/core/testing';

import { ActiveGameStoreService } from './active-game-store.service';

describe('ActiveGameStoreService', () => {
  let service: ActiveGameStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveGameStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
