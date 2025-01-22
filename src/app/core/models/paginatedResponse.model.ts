export interface PaginatedResponse<T> {
    data: T[];
    pageIndex: number;
    pageSize: number;
    totalCount: number;
    maxPageSize: number;
}
