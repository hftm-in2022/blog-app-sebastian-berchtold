import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialDemoComponent } from './material-demo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('MaterialDemoComponent', () => {
  let component: MaterialDemoComponent;
  let fixture: ComponentFixture<MaterialDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MaterialDemoComponent, 
        BrowserAnimationsModule // Include animations module if needed
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
