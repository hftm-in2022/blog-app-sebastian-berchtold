import { Routes } from '@angular/router';
import { AppHomeComponent } from './app-home/app-home.component';
import { AddBlogPageComponent } from './features/add-blog-page/add-blog-page.component';
import { BlogDetailComponent } from './pages/blog-detail/blog-detail.component';

export const routes: Routes = [
  {
    path: '', component: AppHomeComponent
  },
  { path: 'blog/:id', component: BlogDetailComponent },
  { path: 'add-blog', component: AddBlogPageComponent },
];
