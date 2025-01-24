import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, switchMap, throwError} from 'rxjs';
import {map} from 'rxjs/operators';
import {PaginatedResponse} from '../models/paginatedResponse.model';
import {BlogPreview} from '../models/blogPreview.model';
import {BlogDetails} from '../models/blogDetails.model';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {environment} from '../../enviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private oidcSecurityService = inject(OidcSecurityService);
  baseUrl = 'https://d-cap-blog-backend---v2.whitepond-b96fee4b.westeurope.azurecontainerapps.io/';


  constructor(private http: HttpClient) {
  }

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
    return this.http.get<BlogDetails>(`${this.baseUrl}/entries/${id}`).pipe(
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

  createBlog(blog: {
    title: string;
    content: string;
    headerImageUrl?: string;
  }) {
    return this.oidcSecurityService.getAccessToken().pipe(
      switchMap((accessToken) => {
        if (!accessToken) {
          throw new Error('Access token not available.');
        }

        const headers = new HttpHeaders({
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        });

        const url = `${environment.backendUrl}/entries`;

        return this.http.post<BlogDetails>(url, blog, { headers });
      }),
      catchError((error) => {
        console.error('Error creating blog:', error);
        return throwError(() => new Error('Failed to create the blog. Please try again.'));
      })
    );
  }
}
