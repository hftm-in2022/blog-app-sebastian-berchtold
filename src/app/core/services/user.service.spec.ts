import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import {provideHttpClient} from '@angular/common/http';
import {provideAuth} from 'angular-auth-oidc-client';
import {authConfig} from '../auth/auth.config';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(),
        provideAuth(authConfig)]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
