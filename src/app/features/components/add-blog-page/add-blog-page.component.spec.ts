import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBlogPageComponent } from './add-blog-page.component';
import {HttpClient, provideHttpClient} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {provideAuth} from 'angular-auth-oidc-client';
import {authConfig} from '../../../core/auth/auth.config';
import {provideAnimations} from '@angular/platform-browser/animations';

describe('AddBlogPageComponent', () => {
  let component: AddBlogPageComponent;
  let fixture: ComponentFixture<AddBlogPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBlogPageComponent],
      providers: [provideHttpClient(),
      provideAuth(authConfig),
      provideAnimations()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBlogPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
