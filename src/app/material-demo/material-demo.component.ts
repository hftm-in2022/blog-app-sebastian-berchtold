import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { hasRole } from '../guards/is-authenticated.guard';
import { Blog } from '../model/blog';
import { CustomUserData } from '../model/custom-user-data.interface';
import { BlogService } from '../services/blog-service.service';

@Component({
  selector: 'app-material-demo',
  standalone: true,
  templateUrl: './material-demo.component.html',
  styleUrls: ['./material-demo.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
})
export class MaterialDemoComponent {
  username = '';
  isAuthenticated = false;
  userData: CustomUserData | null = null;
  userRoles: string[] = [];
  blogs: Blog[] = [];

  constructor(
    private blogService: BlogService,
    private oidcService: OidcSecurityService
  ) {
    this.oidcService.isAuthenticated$.subscribe((auth) => {
      this.isAuthenticated = auth.isAuthenticated;
    });

    this.oidcService.userData$.subscribe((data: CustomUserData) => {
      this.userData = data;
      this.userRoles = data?.realm_access?.roles || [];
      this.username = data?.name || '';
    });
  }

  login() {
    this.oidcService.authorize();
  }

  logout() {
    this.oidcService.logoff();
  }

  ngOnInit(): void {
    this.blogService.getBlogs().subscribe((blogs) => {
      this.blogs = blogs;
    });
  }

  isUser(): boolean {
    return hasRole(this.userRoles, 'user');
  }
}
