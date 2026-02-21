import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Link, Comment, User, UserProfile, LinkSortType, BlogPost } from '../types';

import { API_URL } from '../config';

const API_BASE_URL = API_URL;

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Link', 'Comment', 'User', 'Blog'],
    endpoints: (builder) => ({
        // Auth endpoints
        signup: builder.mutation<
            { success: boolean; data: { user: User; token: string } },
            { username: string; email: string; password: string }
        >({
            query: (credentials) => ({
                url: '/auth/signup',
                method: 'POST',
                body: credentials,
            }),
        }),
        login: builder.mutation<
            { success: boolean; data: { user: User; token: string } },
            { email: string; password: string }
        >({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        adminLogin: builder.mutation<
            { success: boolean; data: { user: User; token: string } },
            { email: string; password: string }
        >({
            query: (credentials) => ({
                url: '/auth/admin/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        getCurrentUser: builder.query<{ success: boolean; data: User }, void>({
            query: () => '/auth/me',
            providesTags: ['User'],
        }),

        // Link endpoints
        getLinks: builder.query<
            {
                success: boolean;
                data: {
                    links: Link[];
                    pagination: { page: number; limit: number; total: number; pages: number };
                };
            },
            { page?: number; limit?: number; category?: string; tags?: string; sort?: LinkSortType }
        >({
            query: (params) => ({
                url: '/links',
                params,
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.data.links.map(({ _id }) => ({ type: 'Link' as const, id: _id })),
                        { type: 'Link', id: 'LIST' },
                    ]
                    : [{ type: 'Link', id: 'LIST' }],
        }),
        getLinkById: builder.query<{ success: boolean; data: Link }, string>({
            query: (id) => `/links/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Link', id }],
        }),
        createLink: builder.mutation<
            { success: boolean; data: Link },
            {
                title: string;
                url: string;
                description?: string;
                imageUrl?: string;
                category: string;
                tags: string[];
            }
        >({
            query: (link) => ({
                url: '/links',
                method: 'POST',
                body: link,
            }),
            invalidatesTags: [
                { type: 'Link', id: 'LIST' },
                { type: 'Link', id: 'USER-LIST' },
                'User',
            ],
        }),
        fetchLinkPreview: builder.mutation<
            { success: boolean; data: { title: string; description: string; imageUrl: string; siteName?: string } },
            { url: string }
        >({
            query: (data) => ({
                url: '/links/preview',
                method: 'POST',
                body: data,
            }),
        }),
        updateLink: builder.mutation<
            { success: boolean; data: Link },
            { id: string; data: Partial<Link> }
        >({
            query: ({ id, data }) => ({
                url: `/links/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (_result, _error, { id }) => [
                { type: 'Link', id },
                { type: 'Link', id: 'LIST' },
                { type: 'Link', id: 'USER-LIST' },
                'User',
            ],
        }),
        deleteLink: builder.mutation<{ success: boolean }, string>({
            query: (id) => ({
                url: `/links/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [
                { type: 'Link', id: 'LIST' },
                { type: 'Link', id: 'USER-LIST' },
                'User',
            ],
        }),
        toggleUpvote: builder.mutation<
            { success: boolean; data: { upvoteCount: number; hasUpvoted: boolean } },
            string
        >({
            query: (id) => ({
                url: `/links/${id}/upvote`,
                method: 'POST',
            }),
            invalidatesTags: (_result, _error, id) => [{ type: 'Link', id }],
        }),
        getUserLinks: builder.query<
            {
                success: boolean;
                data: {
                    links: Link[];
                    pagination: { page: number; limit: number; total: number; pages: number };
                };
            },
            { userId: string; page?: number; limit?: number }
        >({
            query: ({ userId, ...params }) => ({
                url: `/links/user/${userId}`,
                params,
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.data.links.map(({ _id }) => ({ type: 'Link' as const, id: _id })),
                        { type: 'Link', id: 'USER-LIST' },
                    ]
                    : [{ type: 'Link', id: 'USER-LIST' }],
        }),

        // Comment endpoints
        getCommentsByLink: builder.query<{ success: boolean; data: Comment[] }, string>({
            query: (linkId) => `/comments/${linkId}`,
            providesTags: (_result, _error, linkId) => [{ type: 'Comment', id: linkId }],
        }),
        createComment: builder.mutation<
            { success: boolean; data: Comment },
            { content: string; linkId: string; parentCommentId?: string }
        >({
            query: (comment) => ({
                url: '/comments',
                method: 'POST',
                body: comment,
            }),
            invalidatesTags: (_result, _error, { linkId }) => [
                { type: 'Comment', id: linkId },
                { type: 'Link', id: linkId },
            ],
        }),
        updateComment: builder.mutation<
            { success: boolean; data: Comment },
            { id: string; content: string }
        >({
            query: ({ id, content }) => ({
                url: `/comments/${id}`,
                method: 'PUT',
                body: { content },
            }),
            invalidatesTags: (result) =>
                result ? [{ type: 'Comment', id: result.data.link }] : [],
        }),
        deleteComment: builder.mutation<{ success: boolean }, string>({
            query: (id) => ({
                url: `/comments/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Comment' }],
        }),

        // User endpoints
        getUserProfile: builder.query<{ success: boolean; data: UserProfile }, string>({
            query: (userId) => `/users/${userId}`,
            providesTags: (_result, _error, userId) => [{ type: 'User', id: userId }],
        }),
        updateUserProfile: builder.mutation<
            { success: boolean; data: User },
            { id: string; formData: FormData }
        >({
            query: ({ id, formData }) => ({
                url: `/users/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'User', id }],
        }),

        // Blog endpoints
        getBlogs: builder.query<
            {
                success: boolean;
                data: BlogPost[];
                pagination: { page: number; limit: number; total: number; pages: number };
            },
            { page?: number; limit?: number; search?: string; category?: string } | void
        >({
            query: (params) => ({
                url: '/blogs',
                params: params || {},
            }),
            providesTags: ['Blog'],
        }),
        getBlogById: builder.query<BlogPost, string>({
            query: (id) => `/blogs/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Blog', id }],
        }),
        createBlog: builder.mutation<BlogPost, FormData>({
            query: (blog) => ({
                url: '/blogs',
                method: 'POST',
                body: blog,
            }),
            invalidatesTags: ['Blog'],
        }),
        deleteBlog: builder.mutation<{ message: string }, string>({
            query: (id) => ({
                url: `/blogs/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Blog'],
        }),

        // Admin User Management endpoints
        getAllUsers: builder.query<
            {
                success: boolean;
                data: User[];
                pagination: { page: number; limit: number; total: number; pages: number };
            },
            { page?: number; limit?: number; search?: string; role?: string; status?: string } | void
        >({
            query: (params) => ({
                url: '/users',
                params: params || {},
            }),
            providesTags: ['User'],
        }),
        toggleUserStatus: builder.mutation<
            { success: boolean; message: string; data: { id: string; isDeleted: boolean } },
            string
        >({
            query: (id) => ({
                url: `/users/${id}/status`,
                method: 'PATCH',
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const {
    useSignupMutation,
    useLoginMutation,
    useAdminLoginMutation,
    useGetCurrentUserQuery,
    useGetLinksQuery,
    useGetLinkByIdQuery,
    useCreateLinkMutation,
    useFetchLinkPreviewMutation,
    useUpdateLinkMutation,
    useDeleteLinkMutation,
    useToggleUpvoteMutation,
    useGetUserLinksQuery,
    useGetCommentsByLinkQuery,
    useCreateCommentMutation,
    useUpdateCommentMutation,
    useDeleteCommentMutation,
    useGetUserProfileQuery,
    useUpdateUserProfileMutation,
    useGetAllUsersQuery,
    useToggleUserStatusMutation,
    useGetBlogsQuery,
    useGetBlogByIdQuery,
    useCreateBlogMutation,
    useDeleteBlogMutation,
} = apiSlice;
