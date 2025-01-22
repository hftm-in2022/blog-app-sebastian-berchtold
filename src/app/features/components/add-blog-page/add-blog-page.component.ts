import {Component, inject, signal, WritableSignal} from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {BlogService} from '../../../core/services/blog.service';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';

@Component({
  selector: 'app-add-blog-page',
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatButton,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatCard
  ],
  standalone: true,
  templateUrl: './add-blog-page.component.html',
  styleUrl: './add-blog-page.component.scss'
})
export class AddBlogPageComponent {
  blogForm: FormGroup;
  isLoading: WritableSignal<boolean> = signal(false);

  private formBuilder = inject(FormBuilder);
  private blogService = inject(BlogService);

  constructor() {
    this.blogForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      content: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get title() {
    return this.blogForm.get('title');
  }

  get content() {
    return this.blogForm.get('content');
  }

  resetForm(): void {
    this.blogForm.reset();
  }
}
