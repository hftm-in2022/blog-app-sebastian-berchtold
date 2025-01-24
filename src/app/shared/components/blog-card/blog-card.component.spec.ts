import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogCardComponent } from './blog-card.component';
import {BlogPreview} from '../../../core/models/blogPreview.model';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {By} from '@angular/platform-browser';

describe('BlogCardComponent', () => {
  let component: BlogCardComponent;
  let fixture: ComponentFixture<BlogCardComponent>;

  const mockBlogEntry:BlogPreview = {
    id: 1,
    title: 'Test Blog Title',
    author: 'John Doe',
    createdAt: new Date('2023-01-01'),
    headerImageUrl: 'https://example.com/image.jpg',
    contentPreview: 'This is a preview of the blog content.',
    likes: 10,
    comments: 5,
    likedByMe: true,
    createdByMe: false,
    updatedAt: new Date('2023-01-01'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display blog details correctly', () => {
    component.entry = mockBlogEntry;

    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('.title')).nativeElement;
    const subtitleElement = fixture.debugElement.query(By.css('.subtitle')).nativeElement;
    const contentElement = fixture.debugElement.query(By.css('mat-card-content p')).nativeElement;
    const likesElement = fixture.debugElement.query(By.css('.icon:first-child')).nativeElement;
    const commentsElement = fixture.debugElement.query(By.css('.icon:last-child')).nativeElement;

    expect(titleElement.textContent).toContain(mockBlogEntry.title);
    expect(subtitleElement.textContent).toContain(mockBlogEntry.author);
    expect(subtitleElement.textContent).toContain('01.01.2023'); // Date formatted
    expect(contentElement.textContent).toContain(mockBlogEntry.contentPreview);
    expect(likesElement.textContent).toContain(mockBlogEntry.likes.toString());
    expect(commentsElement.textContent).toContain(mockBlogEntry.comments.toString());
  });

  it('should emit selectBlog event when "Read More" is clicked', () => {
    spyOn(component.selectBlog, 'emit');
    component.entry = mockBlogEntry;

    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();

    expect(component.selectBlog.emit).toHaveBeenCalledOnceWith(mockBlogEntry);
  });
  it('should use the fallback image if the image URL fails to load', () => {
    component.entry = mockBlogEntry;

    fixture.detectChanges();
    const imgElement = fixture.debugElement.query(By.css('img')).nativeElement;

    imgElement.dispatchEvent(new Event('error'));
    fixture.detectChanges();

    expect(imgElement.src).toBe(
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQU23E411UzSYZsdrhp-9gfWKUTqWkbtWVzA&s'
    );
  });
});
