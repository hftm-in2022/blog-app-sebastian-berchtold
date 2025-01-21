import {Routes} from '@angular/router';
import {BlogListComponent} from './features/components/blog-list/blog-list.component';
import {BlogDetailsComponent} from './features/components/blog-details/blog-details.component';

export const routes: Routes = [
  {path: '', component: BlogListComponent},
  {path: 'blogs/:id', component: BlogDetailsComponent},
  {path: '**', redirectTo: ''},
];
