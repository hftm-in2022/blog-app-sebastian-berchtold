import {Routes} from '@angular/router';
import {BlogListComponent} from './features/components/blog-list/blog-list.component';
import {BlogDetailsComponent} from './features/components/blog-details/blog-details.component';

export const routes: Routes = [
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

