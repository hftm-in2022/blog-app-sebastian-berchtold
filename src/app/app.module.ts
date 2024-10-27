import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { AppComponent } from './app.component';
import { MaterialDemoComponent } from './material-demo/material-demo.component'
import { CommonModule } from '@angular/common'

@NgModule({
  declarations: [
    AppComponent,
    MaterialDemoComponent 
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    MatInputModule, // Input field
    MatButtonModule, // Button
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
