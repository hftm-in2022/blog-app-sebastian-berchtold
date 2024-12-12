import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { hasRole } from '../guards/is-authenticated.guard';
import { Blog } from '../model/blog';
import { BlogService } from '../services/blog-service.service';

@Component({
  selector: 'app-material-demo',
  standalone: true, // Ensures component can use direct imports
  templateUrl: './material-demo.component.html',
  styleUrls: ['./material-demo.component.scss'],
  imports: [
    CommonModule, // For *ngIf, *ngFor, and *ngSwitch
    FormsModule, // For ngModel two-way binding
    MatInputModule, // For Material input field
    MatButtonModule, // For Material button
    MatCardModule // For Material card
  ]
})
export class MaterialDemoComponent {
  username = '';

  blogs: Blog[] = [];

  constructor(private blogService: BlogService, private oidcService: OidcSecurityService) {
    this.oidcService.userData$.subscribe((userData) => {
      this.username = userData?.name || '';
    });
  }

  ngOnInit(): void {
    this.blogService.getBlogs().subscribe((blogs) => {
      this.blogs = blogs;
    });
  }

  isUser(): boolean {
    const userRoles = this.oidcService.getUserData()?.roles || [];
    return hasRole(userRoles, 'user');
  }
}
