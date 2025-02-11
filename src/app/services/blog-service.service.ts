import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Blog } from '../model/blog';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private apiUrl = 'https://d-cap-blog-backend---v2.whitepond-b96fee4b.westeurope.azurecontainerapps.io';  // environments oder config verwenden

  constructor(private http: HttpClient) { }

  getBlogs(): Observable<Blog[]> {
    return this.http.get<{ data: Blog[] }>(`${this.apiUrl}/entries`).pipe(
      map((response) => response.data) // Extract the 'data' array
    );
  }


  getBlogById(blogId: string): Observable<Blog> {
    return this.http.get<any>(`${this.apiUrl}/entries/${blogId}`).pipe(
      map((response) => ({
        id: response.id,
        title: response.title,
        author: response.author,
        createdAt: new Date(response.createdAt),
        updatedAt: response.updatedAt ? new Date(response.updatedAt) : undefined,
        content: response.content,
        contentPreview: response.contentPreview,
        headerImageUrl: response.headerImageUrl,
        tags: response.tags || [],
        likes: response.likes || 0,
        comments: response.comments || 0,
      }))
    );
  }
  createBlog(newBlog: Partial<Blog>): Observable<Blog> {
    return this.http.post<Blog>(`${this.apiUrl}/entries`, newBlog);
  }
}
