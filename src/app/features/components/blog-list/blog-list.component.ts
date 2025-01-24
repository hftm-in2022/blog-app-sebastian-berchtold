import {Component, OnInit} from '@angular/core';
import {BlogService} from '../../../core/services/blog.service';
import {BlogPreview} from '../../../core/models/blogPreview.model';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatCard, MatCardContent} from '@angular/material/card';
import {of} from 'rxjs';
import {Router} from '@angular/router';
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
  loading = true;
  errorMessage: string | null = null;

  constructor(private blogService: BlogService, private router: Router) {
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
