import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlogService } from '../services/blog-service.service';
import { AppHomeComponent } from './app-home.component';

describe('MaterialDemoComponent', () => {
  let component: AppHomeComponent;
  let fixture: ComponentFixture<AppHomeComponent
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        BlogService
      ],
      imports: [
        AppHomeComponent,
        BrowserAnimationsModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
