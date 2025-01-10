import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { Blog } from '../../model/blog';
import { BlogService } from '../../services/blog-service.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, MatProgressSpinner]
})
export class BlogDetailComponent implements OnInit {
  blog: Blog | null = null;
  isLoading = true;

  constructor(private route: ActivatedRoute, private blogService: BlogService) { }

  ngOnInit(): void {
    const blogId = this.route.snapshot.paramMap.get('id'); // Get blog ID from route params
    if (blogId) {
      this.blogService.getBlogById(blogId).subscribe({
        next: (data) => {
          this.blog = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching blog details:', err);
          this.isLoading = false;
        },
      });
    }
  }
}
