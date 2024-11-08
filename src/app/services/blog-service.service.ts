import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Blog } from '../model/blog';
import { BlogResponse } from '../model/blogResponse';

@Injectable({
  providedIn: 'root'
})
export class BlogServiceService {
  private apiUrl = 'https://d-cap-blog-backend---v2.whitepond-b96fee4b.westeurope.azurecontainerapps.io/';

  constructor(private http: HttpClient) {}

  getBlogs(): Observable<Blog[]> {
    return this.http.get<BlogResponse>(`${this.apiUrl}/entries`).pipe(
      map((resp: BlogResponse) => resp.data)
    );
  }
}
