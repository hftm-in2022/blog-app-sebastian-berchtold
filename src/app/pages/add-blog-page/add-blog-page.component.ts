import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BlogService } from '../../services/blog-service.service';

@Component({
    selector: 'app-add-blog-page',
    templateUrl: './add-blog-page.component.html',
    styleUrls: ['./add-blog-page.component.scss'],
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatProgressSpinnerModule,
    ]
})
export class AddBlogPageComponent {
  blogForm: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder, private blogService: BlogService) {
    this.blogForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  get title() {
    return this.blogForm.get('title');
  }

  get content() {
    return this.blogForm.get('content');
  }

  resetForm() {
    this.blogForm.reset();
  }

  saveBlog() {
    if (this.blogForm.invalid) return;

    this.isLoading = true;
    const newBlog = this.blogForm.value;

    this.blogService.createBlog(newBlog).subscribe({
      next: () => {
        this.isLoading = false;
        alert('Blog saved successfully!');
        this.resetForm();
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error saving blog:', err);
        alert('An error occurred while saving the blog.');
      },
    });
  }
}
