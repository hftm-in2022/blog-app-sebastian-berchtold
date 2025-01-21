import {Component, Input} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatSidenavModule, MatListModule, MatButtonModule, RouterModule],
  templateUrl: 'sidebar.component.html',
  styleUrl: 'sidebar.component.scss'
})
export class SidebarComponent {
  @Input() isOpen = false;
  @Input() onClose!: () => void;

  onLogin() {
    console.log('Login button clicked');
    alert('Login functionality is not implemented yet.');
  }
}
