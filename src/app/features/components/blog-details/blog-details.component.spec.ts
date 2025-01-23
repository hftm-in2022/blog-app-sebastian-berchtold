import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogDetailsComponent } from './blog-details.component';
import {provideHttpClient} from '@angular/common/http';
import {provideAuth} from 'angular-auth-oidc-client';
import {authConfig} from '../../../core/auth/auth.config';
import {provideRouter} from '@angular/router';
import {routes} from '../../../app.routes';

describe('BlogDetailsComponent', () => {
  let component: BlogDetailsComponent;
  let fixture: ComponentFixture<BlogDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogDetailsComponent],
      providers: [provideHttpClient(),
        provideAuth(authConfig),
      provideRouter(routes)]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
