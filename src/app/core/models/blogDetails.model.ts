export interface Comment {
    id: number;
    content: string;
    author: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface BlogDetails {
    id: number;
    title: string;
    content: string;
    author: string;
    likes: number;
    likedByMe: boolean;
    createdByMe: boolean;
    headerImageUrl: string;
    createdAt: Date;
    updatedAt: Date;
    comments: Comment[];
}
