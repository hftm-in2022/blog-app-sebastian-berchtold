import {Routes} from '@angular/router';
import {BlogListComponent} from './features/components/blog-list/blog-list.component';
import {BlogDetailsComponent} from './features/components/blog-details/blog-details.component';
import {inject} from '@angular/core';
import {AddBlogPageComponent} from './features/components/add-blog-page/add-blog-page.component';
import {isAuthenticated} from './shared/guards/is-authenticated.guard';

export const routes: Routes = [
  {
    path: 'create',
    loadComponent: () =>
        import('./features/components/add-blog-page/add-blog-page.component').then(
            (m) => m.AddBlogPageComponent,
        ), // Lazy loading for standalone components
    canActivate: [isAuthenticated],
  },
  {
    path: 'blogs-overview',
    loadComponent: () =>
      import('./features/components/blog-list/blog-list.component').then(
        (m) => m.BlogListComponent
      ),
  },
  {
    path: 'blogs/:id',
    loadComponent: () =>
      import('./features/components/blog-details/blog-details.component').then(
        (m) => m.BlogDetailsComponent
      ),
  },
  { path: '', redirectTo: '/blogs-overview', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];

