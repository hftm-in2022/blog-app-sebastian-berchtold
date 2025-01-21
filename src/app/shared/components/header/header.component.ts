import {Component, inject, Input} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {Observable, shareReplay} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';
import {OidcSecurityService} from 'angular-auth-oidc-client';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule, MatButtonModule, MatIconModule, RouterModule, AsyncPipe
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() onMenuToggle!: () => void;
  private readonly oidcSecurityService = inject(OidcSecurityService);
  protected readonly authenticated = this.oidcSecurityService.authenticated;

  isMobile$: Observable<boolean>;

  constructor(private readonly breakpointObserver: BreakpointObserver) {
    this.isMobile$ = this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.Handset])
      .pipe(
        map((result) => result.matches),
        shareReplay()
      );
    console.log(this.authenticated);
  }

  login(): void {
    this.oidcSecurityService.authorize();
    console.log('authorized')
  }

  logout(): void {
    this.oidcSecurityService.logoff().subscribe((result) => console.log(result));
  }
}
