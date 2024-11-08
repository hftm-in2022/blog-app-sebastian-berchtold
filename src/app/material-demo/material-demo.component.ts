import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Blog } from '../model/blog';
import { BlogServiceService } from '../services/blog-service.service';

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
  name = '';
  status = 'unknown';
  items = ['Item 1', 'Item 2', 'Item 3'];
  color = 'blue';

  toggleStyle() {
    this.color = this.color === 'blue' ? 'black' : 'blue';
  }

  isHighlighted(item: string) {
    return item.includes('1');
  }

  blogs: Blog[] = [];

  constructor(private blogService: BlogServiceService) {}

  ngOnInit(): void {
    this.blogService.getBlogs().subscribe((blogs) => {
      this.blogs = blogs;
    });
  }
}
