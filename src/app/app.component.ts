import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialDemoComponent } from './material-demo/material-demo.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MaterialDemoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'BlogWebApp';
}
