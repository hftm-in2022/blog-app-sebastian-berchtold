import { TestBed } from '@angular/core/testing';

import { BlogDetailResolverService } from './blog-detail-resolver.service';

describe('BlogDetailResolverService', () => {
  let service: BlogDetailResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogDetailResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
