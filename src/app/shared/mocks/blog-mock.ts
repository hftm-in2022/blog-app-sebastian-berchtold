import {PaginatedResponse} from '../../core/models/paginatedResponse.model';
import {BlogPreview} from '../../core/models/blogPreview.model';
import {of} from 'rxjs';
import {BlogDetails} from '../../core/models/blogDetails.model';

const blogMock: PaginatedResponse<BlogPreview> = {
  data: [
    {
      id: 1,
      title: 'Test Blog 1',
      contentPreview: 'This is a preview of test blog 1',
      author: 'Author 1',
      likes: 10,
      comments: 5,
      likedByMe: true,
      createdByMe: false,
      headerImageUrl: 'https://example.com/image1.jpg',
      createdAt: new Date('2023-01-01T00:00:00Z'),
      updatedAt: new Date('2023-01-02T00:00:00Z'),
    },
    {
      id: 2,
      title: 'Test Blog 2',
      contentPreview: 'This is a preview of test blog 2',
      author: 'Author 2',
      likes: 20,
      comments: 10,
      likedByMe: false,
      createdByMe: true,
      headerImageUrl: 'https://example.com/image2.jpg',
      createdAt: new Date('2023-01-03T00:00:00Z'),
      updatedAt: new Date('2023-01-04T00:00:00Z'),
    },
  ],
  pageIndex: 1,
  pageSize: 10,
  totalCount: 2,
  maxPageSize: 100,
};


export const mockPaginatedResponse: PaginatedResponse<BlogPreview> = {
  data: [
    {
      id: 1,
      title: 'Test Blog 1',
      contentPreview: 'This is a preview of test blog 1',
      author: 'Author 1',
      likes: 10,
      comments: 5,
      likedByMe: true,
      createdByMe: false,
      headerImageUrl: 'https://example.com/image1.jpg',
      createdAt: new Date('2023-01-01T00:00:00Z'),
      updatedAt: new Date('2023-01-02T00:00:00Z'),
    },
    {
      id: 2,
      title: 'Test Blog 2',
      contentPreview: 'This is a preview of test blog 2',
      author: 'Author 2',
      likes: 20,
      comments: 10,
      likedByMe: false,
      createdByMe: true,
      headerImageUrl: 'https://example.com/image2.jpg',
      createdAt: new Date('2023-01-03T00:00:00Z'),
      updatedAt: new Date('2023-01-04T00:00:00Z'),
    },
  ],
  pageIndex: 1,
  pageSize: 10,
  totalCount: 2,
  maxPageSize: 100,
};

export const mockBlogDetails: BlogDetails = {
  id: 1,
  title: 'Test Blog 1',
  content: 'This is the full content of test blog 1.',
  author: 'Author 1',
  likes: 10,
  comments: [
    {
      id: 1,
      content: 'Great blog!',
      author: 'Commenter 1',
      createdAt: new Date('2023-01-02T00:00:00Z'),
      updatedAt: new Date('2023-01-02T01:00:00Z'),
    },
  ],
  likedByMe: true,
  createdByMe: false,
  headerImageUrl: 'https://example.com/image1.jpg',
  createdAt: new Date('2023-01-01T00:00:00Z'),
  updatedAt: new Date('2023-01-02T00:00:00Z'),
};

export const mockPaginatedResponseObservable = of(blogMock);
