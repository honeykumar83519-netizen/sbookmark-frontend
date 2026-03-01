export interface User {
    id: string;
    username: string;
    email: string;
    avatar?: string;
    bio?: string;
    isDeleted?: boolean;
    deletedAt?: string;
    createdAt: string;
    role: 'user' | 'admin';
}

export interface Link {
    _id: string;
    title: string;
    url: string;
    description?: string;
    imageUrl?: string;
    author: {
        _id: string;
        username: string;
        avatar?: string;
    };
    category: string;
    tags: string[];
    upvotes: string[];
    upvoteCount: number;
    commentCount: number;
    views: number;
    createdAt: string;
    updatedAt: string;
}

export interface Comment {
    _id: string;
    content: string;
    author: {
        _id: string;
        username: string;
        avatar?: string;
    };
    link: string;
    parentComment?: string;
    replies: Comment[];
    createdAt: string;
    updatedAt: string;
}

export interface UserProfile {
    user: User;
    stats: {
        linksSubmitted: number;
        commentsPosted: number;
        totalUpvotes: number;
    };
}

export type LinkSortType = 'latest' | 'trending' | 'top';

export type CategoryType =
    | 'Technology'
    | 'Design'
    | 'Business'
    | 'Science'
    | 'Entertainment'
    | 'Health'
    | 'Education'
    | 'Education'
    | 'Other';

export interface BlogPost {
    _id: string;
    title: string;
    content: string;
    excerpt: string;
    author: string;
    image: string;
    category: string;
    tags: string[];
    slug?: string;
    createdAt: string;
    updatedAt: string;
}
