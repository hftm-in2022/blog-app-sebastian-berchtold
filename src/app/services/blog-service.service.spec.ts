import { TestBed } from '@angular/core/testing';
import { BlogServiceService } from './blog-service.service';
import { provideHttpClient } from '@angular/common/http';


describe('BlogServiceService', () => {
  let service: BlogServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlogServiceService, provideHttpClient()] 
    });
    service = TestBed.inject(BlogServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
