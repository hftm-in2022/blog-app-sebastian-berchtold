import { Component } from '@angular/core';
import {RouterModule, RouterOutlet} from '@angular/router';
import {BlogListComponent} from './features/components/blog-list/blog-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    RouterModule,
    BlogListComponent
  ]
})
export class AppComponent {
  title = 'BlogWebApp2.0';
}
