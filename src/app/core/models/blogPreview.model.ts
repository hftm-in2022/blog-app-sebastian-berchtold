export interface BlogPreview {
    id: number;
    title: string;
    contentPreview: string;
    author: string;
    likes: number;
    comments: number;
    likedByMe: boolean;
    createdByMe: boolean;
    headerImageUrl: string;
    createdAt: Date;
    updatedAt: Date;
}
