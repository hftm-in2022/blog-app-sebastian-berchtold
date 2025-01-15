import {Component, OnInit} from '@angular/core';
import {BlogDetails} from '../../models/blogDetails.model';
import {BlogService} from '../../services/blog.service';
import {ActivatedRoute} from '@angular/router';
import {DatePipe} from '@angular/common';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatCard, MatCardContent, MatCardFooter, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {MatDivider} from '@angular/material/divider';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [
    DatePipe,
    MatProgressSpinner,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatCardSubtitle,
    MatCardFooter,
    MatDivider
  ],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.scss'
})
export class BlogDetailsComponent implements OnInit{
  blog: BlogDetails | null = null;
  loading = true;
  errorMessage: string | null = null;

  constructor(private blogService: BlogService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    console.log('Blog ID:', id);
    this.loadBlog(id);
  }

  loadBlog(id: number): void {
    this.blogService.getBlogById(id).subscribe({
      next: (blog) => {
        this.blog = blog;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load the blog. Please try again later.';
        this.loading = false;
        console.error('Error fetching blog details:', err);
      },
    });
  }
}
