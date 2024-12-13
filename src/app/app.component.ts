import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialDemoComponent } from './material-demo/material-demo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, MaterialDemoComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
  ]
})
export class AppComponent {
  title = 'BlogWebApp';
}
