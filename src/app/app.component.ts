import { Component } from '@angular/core';
import {RouterModule, RouterOutlet} from '@angular/router';
import {BlogListComponent} from './features/components/blog-list/blog-list.component';
import {MatToolbar} from '@angular/material/toolbar';
import {SidebarComponent} from './shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    RouterModule,
  ]
})
export class AppComponent {
  title = 'BlogWebApp2.0';
}
