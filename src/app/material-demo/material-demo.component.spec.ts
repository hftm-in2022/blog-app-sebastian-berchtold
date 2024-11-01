import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialDemoComponent } from './material-demo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { BlogServiceService } from '../services/blog-service.service';

describe('MaterialDemoComponent', () => {
  let component: MaterialDemoComponent;
  let fixture: ComponentFixture<MaterialDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(), 
        BlogServiceService          
      ],
      imports: [
        MaterialDemoComponent, 
        BrowserAnimationsModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
