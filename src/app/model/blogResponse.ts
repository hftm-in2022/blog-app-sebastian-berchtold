import { Blog } from "./blog";

export interface BlogResponse {
    data: Blog[];
    maxPageSize: number;
    pageIndex: number;
    pageSize: number;
    totalCount: number;
  }
  
