import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule, MatButtonModule, MatIconModule, RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  onMenuClick() {
    console.log('Menu button clicked');
  }

  onLogin() {
    console.log('Login button clicked');
    alert('Login functionality is not implemented yet.');
  }
}
