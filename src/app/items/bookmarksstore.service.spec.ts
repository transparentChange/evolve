import { TestBed } from '@angular/core/testing';

import { BookmarksStoreService } from './bookmarksstore.service';

describe('BookmarksstoreService', () => {
  let service: BookmarksStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookmarksStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
