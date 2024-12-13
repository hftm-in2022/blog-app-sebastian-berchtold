import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { BlogService } from './services/blog-service.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    const spy = jasmine.createSpyObj('BlogService', ['getBlogs']);
    spy.getBlogs.and.returnValue(of([]));  // Mock `getBlogs` to return an empty array

    await TestBed.configureTestingModule({
      imports: [AppComponent, BrowserAnimationsModule],
      providers: [
        { provide: BlogService, useValue: spy }  // Provide the mock BlogService
      ]
    }).compileComponents();
    TestBed.inject(BlogService) as jasmine.SpyObj<BlogService>
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
