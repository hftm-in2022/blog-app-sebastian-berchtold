import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-blog-detail-page',
  standalone: true,
  imports: [],
  templateUrl: './blog-detail-page.component.html',
  styleUrl: './blog-detail-page.component.scss'
})
export class BlogDetailPageComponent {
  blog!: Blog;

  constructor(private route: ActivatedRoute) {
    this.blog = this.route.snapshot.data['blog'];
  }
}
