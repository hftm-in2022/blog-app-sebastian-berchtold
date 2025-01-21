import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SidebarComponent} from './shared/components/sidebar/sidebar.component';
import {HeaderComponent} from './shared/components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    RouterModule,
    SidebarComponent,
    HeaderComponent,
  ]
})
export class AppComponent {
  title = 'BlogWebApp2.0';
}
