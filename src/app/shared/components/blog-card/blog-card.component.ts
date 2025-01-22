import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BlogPreview} from '../../../features/models/blogPreview.model';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardImage, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {DatePipe} from '@angular/common';
import {MatButton} from '@angular/material/button';

@Component({
    selector: 'app-blog-card',
    imports: [
        MatCard,
        MatCardHeader,
        MatCardContent,
        MatCardActions,
        MatIcon,
        DatePipe,
        MatCardImage,
        MatButton,
        MatCardSubtitle,
        MatCardTitle
    ],
    standalone: true,
    templateUrl: './blog-card.component.html',
    styleUrl: './blog-card.component.scss'
})
export class BlogCardComponent {
    @Input() entry: BlogPreview | undefined;

    @Output()
    selectBlog = new EventEmitter<BlogPreview>();

    selectBlogEntry(entry: BlogPreview) {
        this.selectBlog.emit(entry);
    }
}
