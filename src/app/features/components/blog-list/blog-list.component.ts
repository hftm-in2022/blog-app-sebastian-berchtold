import {Component, OnInit} from '@angular/core';
import {BlogService} from '../../services/blog.service';
import {BlogPreview} from '../../models/blogPreview.model';
import {PaginatedResponse} from '../../models/paginatedResponse.model';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {of} from 'rxjs';
import {Router, RouterLink} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {BlogCardComponent} from '../../../shared/components/blog-card/blog-card.component';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [
    BlogCardComponent,
    MatProgressSpinner,
    MatCard,
    MatCardContent

  ],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss'
})
export class BlogListComponent implements OnInit {
  blogs: BlogPreview[] = [];
  pagination: Omit<PaginatedResponse<BlogPreview>, 'data'> | null = null;
  loading = true;
  errorMessage: string | null = null;

  constructor(private blogService: BlogService,  private router: Router) {
  }

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

  goToBlog(entry: BlogPreview) {
    this.router.navigate(['/blogs', entry.id]);
  }

  protected readonly of = of;
}
