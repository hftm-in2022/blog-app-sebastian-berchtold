import { TestBed } from '@angular/core/testing';
import { AppHomeComponent } from './app-home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { BlogService } from '../services/blog-service.service';
import { OidcSecurityService } from 'angular-auth-oidc-client';

describe('AppHomeComponent', () => {
  let mockBlogService: jasmine.SpyObj<BlogService>;
  let mockOidcService: jasmine.SpyObj<OidcSecurityService>;

  beforeEach(async () => {
    mockBlogService = jasmine.createSpyObj('BlogService', ['getBlogs']);
    mockOidcService = jasmine.createSpyObj('OidcSecurityService', ['checkAuth'], {
      isAuthenticated$: of(true),
      userData$: of(null),
    });

    // Mock methods
    mockBlogService.getBlogs.and.returnValue(of([]));
    mockOidcService.checkAuth.and.returnValue(of({ isAuthenticated: true }));

    await TestBed.configureTestingModule({
      imports: [AppHomeComponent, RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provide: BlogService, useValue: mockBlogService },
        { provide: OidcSecurityService, useValue: mockOidcService },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AppHomeComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should call getBlogs on initialization', () => {
    const fixture = TestBed.createComponent(AppHomeComponent);
    fixture.detectChanges();
    expect(mockBlogService.getBlogs).toHaveBeenCalled();
  });

  it('should check authentication status on initialization', () => {
    const fixture = TestBed.createComponent(AppHomeComponent);
    fixture.detectChanges();
    expect(mockOidcService.checkAuth).toHaveBeenCalled();
  });

  it('should have an empty blogs array initially', () => {
    const fixture = TestBed.createComponent(AppHomeComponent);
    const app = fixture.componentInstance;
    expect(app.blogs).toEqual([]);
  });
});
