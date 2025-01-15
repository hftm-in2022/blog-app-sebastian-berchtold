import { Routes } from '@angular/router';
import {BlogListComponent} from './features/components/blog-list/blog-list.component';
import {BlogDetailsComponent} from './features/components/blog-details/blog-details.component';
import {SidebarComponent} from './shared/components/sidebar/sidebar.component';

export const routes: Routes = [
    {
        path: '',
        component: SidebarComponent,
        children: [
            { path: '', component: BlogListComponent },
            { path: 'blogs/:id', component: BlogDetailsComponent },
        ],
    },
    { path: '**', redirectTo: '' },
];