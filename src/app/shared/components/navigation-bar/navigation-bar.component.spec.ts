import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationBarComponent } from './navigation-bar.component';
import {provideHttpClient} from '@angular/common/http';
import {provideAuth} from 'angular-auth-oidc-client';
import {authConfig} from '../../../core/auth/auth.config';
import {provideAnimations} from '@angular/platform-browser/animations';

describe('NavigationBarComponent', () => {
  let component: NavigationBarComponent;
  let fixture: ComponentFixture<NavigationBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationBarComponent],
      providers: [provideHttpClient(),
        provideAuth(authConfig),
        provideAnimations()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
