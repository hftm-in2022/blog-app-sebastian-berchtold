import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'blogs',
    loadChildren: () =>
      import('./pages/blog-list/blog-list.module').then((m) => m.BlogListModule),
  },
  {
    path: 'blog/:id',
    loadChildren: () =>
      import('./pages/blog-detail/blog-detail.module').then((m) => m.BlogDetailModule),
    resolve: { blog: BlogDetailResolver },
  },
];
