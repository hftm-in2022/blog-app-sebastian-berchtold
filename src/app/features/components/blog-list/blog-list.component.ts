import {Component, OnInit} from '@angular/core';
import {BlogService} from '../../services/blog.service';
import {BlogPreview} from '../../models/blogPreview.model';
import {PaginatedResponse} from '../../models/paginatedResponse.model';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {of} from 'rxjs';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [
    MatProgressSpinner,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatCardSubtitle,
    MatCardActions,
    MatGridList,
    MatGridTile,
    MatCardHeader,
    RouterLink
  ],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss'
})
export class BlogListComponent implements OnInit{
  blogs: BlogPreview[] = [];
  pagination: Omit<PaginatedResponse<BlogPreview>, 'data'> | null = null;
  loading = true;
  errorMessage: string | null = null;

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.loadBlogs();
  }

  loadBlogs(): void {
    this.blogService.getBlogs().subscribe({
      next: (response) => {
        console.log('Blogs loaded:', response.data);
        this.blogs = response.data;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load blogs. Please try again later.' + error;
        this.loading = false;
      },
    });
  }

  protected readonly of = of;
}
