export interface Blog {
  id: string;
  title: string;
  author: string;
  createdAt: Date;
  updatedAt?: Date;
  content: string;
  contentPreview: string;
  headerImageUrl?: string;
  tags?: string[];
  likes?: number;
  comments?: number;
}
