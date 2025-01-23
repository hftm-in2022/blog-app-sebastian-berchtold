import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BlogListComponent} from './blog-list.component';
import {provideHttpClient} from '@angular/common/http';
import {provideAuth} from 'angular-auth-oidc-client';
import {authConfig} from '../../../core/auth/auth.config';
import {provideAnimations} from '@angular/platform-browser/animations';
import {BlogService} from '../../../core/services/blog.service';
import {of} from 'rxjs';
import {PaginatedResponse} from '../../../core/models/paginatedResponse.model';
import {BlogPreview} from '../../../core/models/blogPreview.model';
import {Router} from '@angular/router';

describe('BlogListComponent', () => {
  let component: BlogListComponent;
  let fixture: ComponentFixture<BlogListComponent>;
  let blogServiceSpy: jasmine.SpyObj<BlogService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    blogServiceSpy = jasmine.createSpyObj('BlogService', ['getBlogs']);
    blogServiceSpy.getBlogs.and.returnValue(mockPaginatedResponseObservable);

    await TestBed.configureTestingModule({
      imports: [BlogListComponent],
      providers: [
        provideHttpClient(),
        provideAuth(authConfig),
        provideAnimations(),
        {provide: BlogService, useValue: blogServiceSpy},
        {provide: Router, useValue: routerSpy}
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BlogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve blogs', () => {
    expect(component.blogs.length).toBe(2);
    expect(component.blogs[0].title).toBe('Test Blog 1');
    expect(component.blogs[1].title).toBe('Test Blog 2');
  });

  it('should retrieve blogs and update the view', () => {
    blogServiceSpy.getBlogs.and.returnValue(mockPaginatedResponseObservable);
    fixture.detectChanges();

    expect(component.blogs.length).toBe(2);
    expect(component.blogs[0].title).toBe('Test Blog 1');
    expect(component.loading).toBeFalse();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('.blog-card').length).toBe(4);
  });

  it('should display a spinner while loading blogs', () => {
    blogServiceSpy.getBlogs.and.returnValue(of());
    component.loading = true;

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-progress-spinner')).toBeTruthy();
  });

  it('should navigate to a blog when a card is clicked', () => {
    blogServiceSpy.getBlogs.and.returnValue(mockPaginatedResponseObservable);
    fixture.detectChanges();

    const blog = component.blogs[0];
    component.goToBlog(blog);

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/blogs', blog.id]);
  });
});

const mockPaginatedResponse: PaginatedResponse<BlogPreview> = {
  data: [
    {
      id: 1,
      title: 'Test Blog 1',
      contentPreview: 'This is a preview of test blog 1',
      author: 'Author 1',
      likes: 10,
      comments: 5,
      likedByMe: true,
      createdByMe: false,
      headerImageUrl: 'https://example.com/image1.jpg',
      createdAt: new Date('2023-01-01T00:00:00Z'),
      updatedAt: new Date('2023-01-02T00:00:00Z'),
    },
    {
      id: 2,
      title: 'Test Blog 2',
      contentPreview: 'This is a preview of test blog 2',
      author: 'Author 2',
      likes: 20,
      comments: 10,
      likedByMe: false,
      createdByMe: true,
      headerImageUrl: 'https://example.com/image2.jpg',
      createdAt: new Date('2023-01-03T00:00:00Z'),
      updatedAt: new Date('2023-01-04T00:00:00Z'),
    },
  ],
  pageIndex: 1,
  pageSize: 10,
  totalCount: 2,
  maxPageSize: 100,
};

export const mockPaginatedResponseObservable = of(mockPaginatedResponse);
