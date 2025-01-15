import { Component } from '@angular/core';
import {BlogDetails} from '../../models/blogDetails.model';
import {BlogService} from '../../services/blog.service';
import {ActivatedRoute} from '@angular/router';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.scss'
})
export class BlogDetailsComponent {
  blog: BlogDetails | null = null;

  constructor(private blogService: BlogService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.loadBlog(id);
  }

  loadBlog(id: number): void {
    this.blogService.getBlogById(id).subscribe({
      next: (blog) => {
        this.blog = blog;
      },
      error: (err) => {
        console.error('Error fetching blog details:', err);
      },
    });
  }
}
