import { TestBed } from '@angular/core/testing';

import { LeaderboardStoreService } from './leaderboard-store.service';

describe('LeaderboardStoreService', () => {
  let service: LeaderboardStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaderboardStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
