import {TestBed} from '@angular/core/testing';

import {BlogService} from './blog.service';
import {provideHttpClient} from '@angular/common/http';
import {provideAuth} from 'angular-auth-oidc-client';
import {authConfig} from '../auth/auth.config';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {mockBlogDetails, mockPaginatedResponse} from '../../shared/mocks/blog-mock';

describe('BlogService', () => {
  let service: BlogService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(),
        provideHttpClientTesting(),
        provideAuth(authConfig)]
    });
    service = TestBed.inject(BlogService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch blogs successfully', () => {
    service.getBlogs().subscribe((response) => {
      expect(response).toBeTruthy();
      expect(response.data.length).toBe(2);
      expect(response.data[0].title).toBe('Test Blog 1');
      expect(response.data[1].title).toBe('Test Blog 2');
    });

    const req = httpMock.expectOne(`${service.baseUrl}/entries`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPaginatedResponse);
  });

  it('should handle error responses correctly', () => {
    service.getBlogs().subscribe({
      next: () => fail('Expected an error, but got a success response'),
      error: (error) => {
        expect(error.status).toBe(404);
        expect(error.statusText).toBe('Not Found');
      },
    });

    const req = httpMock.expectOne(`${service.baseUrl}/entries`);
    expect(req.request.method).toBe('GET');
    req.flush('Not Found', {status: 404, statusText: 'Not Found'});
  });

  it('should fetch blog details successfully', () => {
    service.getBlogById(1).subscribe((response) => {
      expect(response).toBeTruthy();
      expect(response.id).toBe(1);
      expect(response.title).toBe('Test Blog 1');
      expect(response.comments.length).toBe(1);
      expect(response.comments[0].content).toBe('Great blog!');
    });

    const req = httpMock.expectOne(`${service.baseUrl}/entries/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockBlogDetails);
  });
});

