import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BlogDetailResolverService } from './resolvers/blog-detail-resolver.service';

export const routes: Routes = [
  {
    path: '', component: AppComponent
  },
  {
    path: 'blogs',
    loadChildren: () =>
      import('./pages/blog-list/blog-list.module').then((m) => m.BlogListModule),
  },
  {
    path: 'blog/:id',
    loadChildren: () =>
      import('./pages/blog-detail/blog-detail.module').then((m) => m.BlogDetailModule),
    resolve: { blog: BlogDetailResolverService },
  },
  {
    path: 'add-blog',
    loadChildren: () =>
      import('./features/add-blog-page/add-blog-page.module').then(
        (m) => m.AddBlogPageModule
      ),
  },
];
