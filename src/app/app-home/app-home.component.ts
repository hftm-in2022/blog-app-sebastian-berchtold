import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterModule } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { map, Observable } from 'rxjs';
import { Blog } from '../model/blog';
import { CustomUserData } from '../model/custom-user-data.interface';
import { BlogService } from '../services/blog-service.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './app-home.component.html',
  styleUrls: ['./app-home.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    RouterModule
  ],
})
export class AppHomeComponent implements OnInit {
  username = '';
  isAuthenticated$!: Observable<boolean>;
  userData$!: Observable<CustomUserData | null>;
  blogs: Blog[] = [];
  isLoading = true;
  userRoles: string[] = [];

  constructor(
    private blogService: BlogService,
    private oidcService: OidcSecurityService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.oidcService.checkAuth().subscribe({
      next: (authResult) => {
        console.log('Auth Result:', authResult);
        console.log('Is Authenticated', authResult.isAuthenticated);

      },
      error: (err) => {
        console.error('Error during checkAuth:', err);
      },
    });

    this.isAuthenticated$ = this.oidcService.isAuthenticated$.pipe(
      map((authResult) => authResult.isAuthenticated)
    );
    this.userData$ = this.oidcService.userData$;

    this.userData$.subscribe((data) => {
      this.userRoles = data?.realm_access?.roles || [];
      this.username = data?.name || '';
    });

    this.blogService.getBlogs().subscribe({
      next: (blogs) => {
        console.log('Fetched Blogs:', blogs);
        this.blogs = blogs;
        console.log('Assigned Blogs:', this.blogs);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching blogs:', err);
        this.isLoading = false;
      },
    });
    /* this.blogs = [
       {
         id: "1",
         title: 'Mock Blog 1',
         author: 'John Doe',
         contentPreview: 'This is a preview of the first blog.',
         createdAt: new Date('2025-01-10T09:58:47'),
         updatedAt: new Date('2025-01-10T09:58:47'),
         likes: 10,
         comments: 2,
         content: '',
       },
       {
         id: "2",
         title: 'Mock Blog 2',
         author: 'Jane Smith',
         contentPreview: 'This is a preview of the second blog.',
         createdAt: new Date('2025-01-11T09:58:47'),
         updatedAt: new Date('2025-01-11T09:58:47'),
         likes: 5,
         comments: 1,
         content: '',
       },
     ];*/
    this.isLoading = false;
  }

  isUser(role: string): boolean {
    return this.userRoles.includes(role);
  }

  navigateToAddBlog(): void {
    this.router.navigate(['/add-blog']);
  }
}
