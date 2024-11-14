import { Injectable } from '@angular/core';
import { BlogServiceService } from '../services/blog-service.service'
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs'
import { Blog } from '../model/blog'

@Injectable({
  providedIn: 'root'
})
export class BlogDetailResolverService {
  constructor(private blogService: BlogServiceService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Blog> {
    const blogId = route.paramMap.get('id')!;
    return this.blogService.getBlogById(blogId);
  }
}
