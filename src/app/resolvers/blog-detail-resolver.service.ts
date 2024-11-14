import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogDetailResolverService {
  constructor(private blogService: BlogService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Blog> {
    const blogId = route.paramMap.get('id')!;
    return this.blogService.getBlogById(blogId);
  }
}
