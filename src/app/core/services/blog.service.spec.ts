import { TestBed } from '@angular/core/testing';

import { BlogService } from './blog.service';
import {provideHttpClient} from '@angular/common/http';
import {provideAuth} from 'angular-auth-oidc-client';
import {authConfig} from '../auth/auth.config';

describe('BlogService', () => {
  let service: BlogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(),
        provideAuth(authConfig)]
    });
    service = TestBed.inject(BlogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
