import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { BlogServiceService } from './services/blog-service.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  beforeEach(async () => {
    const spy = jasmine.createSpyObj('BlogService', ['getBlogs']);
    spy.getBlogs.and.returnValue(of([]));  // Mock `getBlogs` to return an empty array

    await TestBed.configureTestingModule({
      imports: [AppComponent,  BrowserAnimationsModule],
      providers: [
        { provide: BlogServiceService, useValue: spy }  // Provide the mock BlogService
      ]
    }).compileComponents();

    const blogServiceSpy = TestBed.inject(BlogServiceService) as jasmine.SpyObj<BlogServiceService>;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have the title "BlogWebApp"', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('BlogWebApp');
  });
});
