import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BlogListComponent} from './blog-list.component';
import {provideHttpClient} from '@angular/common/http';
import {provideAuth} from 'angular-auth-oidc-client';
import {authConfig} from '../../../core/auth/auth.config';
import {provideAnimations} from '@angular/platform-browser/animations';
import {BlogService} from '../../../core/services/blog.service';
import {of} from 'rxjs';
import {Router} from '@angular/router';
import {mockPaginatedResponseObservable} from '../../../shared/mocks/blog-mock';

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

