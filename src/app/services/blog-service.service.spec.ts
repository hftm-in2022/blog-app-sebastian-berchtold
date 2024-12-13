import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { BlogService } from './blog-service.service';


describe('BlogServiceService', () => {
  let service: BlogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlogService, provideHttpClient()]
    });
    service = TestBed.inject(BlogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
