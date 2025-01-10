import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppHomeComponent } from './app-home/app-home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, AppHomeComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
  ]
})
export class AppComponent {
  title = 'BlogWebApp';
}
