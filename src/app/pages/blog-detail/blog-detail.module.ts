import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blog } from '../../model/blog';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class BlogDetailModule {
  blog!: Blog;

  constructor(private route: ActivatedRoute) {
    this.blog = this.route.snapshot.data['blog'];
  }
}
