import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Blog } from '../model/blog';
import { BlogService } from '../services/blog-service.service';

@Injectable({
  providedIn: 'root'
})
export class BlogDetailResolverService {  // wo wird der verwendet?
  constructor(private blogService: BlogService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Blog[]> {
    return this.blogService.getBlogs();
  }
}
