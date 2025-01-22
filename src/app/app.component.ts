import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SidebarComponent} from './shared/components/sidebar/sidebar.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [
        RouterModule,
        SidebarComponent
    ]
})
export class AppComponent {
}
