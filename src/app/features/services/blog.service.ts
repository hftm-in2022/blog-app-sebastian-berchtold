import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {PaginatedResponse} from '../models/paginatedResponse.model';
import {BlogPreview} from '../models/blogPreview.model';
import {BlogDetails} from '../models/blogDetails.model';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private baseUrl = 'https://d-cap-blog-backend---v2.whitepond-b96fee4b.westeurope.azurecontainerapps.io/';


  constructor(private http: HttpClient) {}
  getBlogs(): Observable<PaginatedResponse<BlogPreview>> {
    return this.http.get<PaginatedResponse<BlogPreview>>(`${this.baseUrl}/entries`).pipe(
        map((response) => ({
          ...response,
          data: response.data.map((blog) => ({
            ...blog,
            createdAt: new Date(blog.createdAt),
            updatedAt: new Date(blog.updatedAt),
          })),
        }))
    );
  }

  getBlogById(id: number): Observable<BlogDetails> {
    return this.http.get<BlogDetails>(`${this.baseUrl}/blogs/${id}`).pipe(
        map((blog) => ({
          ...blog,
          createdAt: new Date(blog.createdAt),
          updatedAt: new Date(blog.updatedAt),
          comments: blog.comments.map((comment) => ({
            ...comment,
            createdAt: new Date(comment.createdAt),
            updatedAt: new Date(comment.updatedAt),
          })),
        }))
    );
  }
}
