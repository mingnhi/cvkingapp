// Các module này sẽ được thêm sau khi tạo xong
// import { getBlogCategoriesRequest, getBlogCategoryByIdRequest, searchBlogCategoriesByNameRequest } from "../BlogCategory/request";
// import { getBlogCommentsRequest, getBlogCommentByIdRequest, getBlogCommentsByPostRequest, getBlogCommentsByUserRequest, createBlogCommentRequest, updateBlogCommentRequest, deleteBlogCommentRequest, approveBlogCommentRequest, rejectBlogCommentRequest, bulkApproveBlogCommentsRequest, bulkDeleteBlogCommentsRequest } from "../BlogComments/request";
// import { getBlogPostsRequest, getBlogPostByIdRequest, getBlogPostBySlugRequest, searchBlogPostsByTitleRequest, createBlogPostRequest, updateBlogPostRequest, deleteBlogPostRequest, addTagsToBlogPostRequest, removeTagFromBlogPostRequest, publishBlogPostRequest, unpublishBlogPostRequest } from "../BlogPosts/request";
// import { getBlogTagsRequest, getBlogTagByIdRequest, searchBlogTagsByNameRequest, createBlogTagRequest, updateBlogTagRequest, deleteBlogTagRequest } from "../BlogTags/request";
import { getSavedBlogsRequest, getSavedBlogByIdRequest, saveBlogRequest, removeSavedBlogRequest, removeSavedBlogByBlogIdRequest, checkBlogSavedRequest } from "../SavedBlogs/request";
import { SavedBlogFilter } from "../SavedBlogs/type";
import { recordBlogViewRequest, getBlogViewStatsRequest, getBlogOverviewStatsRequest, getBlogViewTrendsRequest, getTopBlogPostsRequest } from "../BlogViews/request";
import { BlogAnalyticsFilter } from "../BlogViews/type";

// Types
export interface BlogFilters {
  authorId?: string;
  status?: 'published' | 'unpublished';
  page?: number;
  limit?: number;
}

export interface CommentFilters {
  blogPostId?: string;
  userId?: string;
  isApproved?: boolean;
}

export interface CreateBlogCommentData {
  blogPostId: string;
  userId: string;
  content: string;
  parentCommentId?: string;
}

export interface UpdateBlogCommentData {
  content?: string;
}

export interface CreateBlogPostData {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  coverImageUrl?: string;
  authorId: string;
  isPublished?: boolean;
  tagIds?: string[];
}

export interface UpdateBlogPostData {
  title?: string;
  slug?: string;
  content?: string;
  excerpt?: string;
  coverImageUrl?: string;
  authorId?: string;
  isPublished?: boolean;
  tagIds?: string[];
}

// Unified Blog API Requests
export const blogRequests = {
  // Saved Blogs APIs - ĐÃ TẠO XONG ✅
  getSavedBlogs: (filters?: SavedBlogFilter) => getSavedBlogsRequest(filters),
  getSavedBlogById: (id: string) => getSavedBlogByIdRequest(id),
  saveBlog: (blogPostId: string) => saveBlogRequest(blogPostId),
  removeSavedBlog: (id: string) => removeSavedBlogRequest(id),
  removeSavedBlogByBlogId: (blogPostId: string) => removeSavedBlogByBlogIdRequest(blogPostId),
  checkBlogSaved: (blogPostId: string) => checkBlogSavedRequest(blogPostId),

  // Blog Views APIs - ĐÃ TẠO XONG ✅
  recordBlogView: (blogPostId: string, userId?: string, ipAddress?: string, userAgent?: string) =>
    recordBlogViewRequest(blogPostId, userId, ipAddress, userAgent),
  getBlogViewStats: (blogPostId: string) => getBlogViewStatsRequest(blogPostId),
  getBlogOverviewStats: (filters?: BlogAnalyticsFilter) => getBlogOverviewStatsRequest(filters),
  getBlogViewTrends: (filters?: BlogAnalyticsFilter) => getBlogViewTrendsRequest(filters),
  getTopBlogPosts: (filters?: BlogAnalyticsFilter) => getTopBlogPostsRequest(filters),

  // Các API khác sẽ được thêm sau khi tạo xong các module tương ứng
  // Blog Posts APIs - CHƯA TẠO
  // getAllPosts: (filters?: BlogFilters) => getBlogPostsRequest(filters),
  // getPostById: (id: string) => getBlogPostByIdRequest(id),
  // getPostBySlug: (slug: string) => getBlogPostBySlugRequest(slug),
  // searchPosts: (title: string) => searchBlogPostsByTitleRequest(title),
  // createPost: ({ title, slug, content, excerpt, coverImageUrl, authorId, isPublished, tagIds }: CreateBlogPostData) =>
  //   createBlogPostRequest({ title, slug, content, excerpt, coverImageUrl, authorId, isPublished, tagIds }),
  // updatePost: (params: { id: string; data: UpdateBlogPostData }) => updateBlogPostRequest(params),
  // deletePost: (id: string) => deleteBlogPostRequest(id),
  // addTagsToPost: (id: string, tagIds: string[]) => addTagsToBlogPostRequest(id, tagIds),
  // removeTagFromPost: (id: string, tagId: string) => removeTagFromBlogPostRequest(id, tagId),
  // publishPost: (id: string) => publishBlogPostRequest(id),
  // unpublishPost: (id: string) => unpublishBlogPostRequest(id),

  // Blog Tags APIs - CHƯA TẠO
  // getAllTags: () => getBlogTagsRequest(),
  // getTagById: (id: string) => getBlogTagByIdRequest(id),
  // searchTags: (name: string) => searchBlogTagsByNameRequest(name),
  // createTag: ({ name }: { name: string }) => createBlogTagRequest({ name }),
  // updateTag: (params: { id: string; data: { name?: string } }) => updateBlogTagRequest(params),
  // deleteTag: (id: string) => deleteBlogTagRequest(id),

  // Blog Categories APIs - CHƯA TẠO
  // getAllCategories: () => getBlogCategoriesRequest(),
  // getCategoryById: (id: string) => getBlogCategoryByIdRequest(id),
  // searchCategories: (name: string) => searchBlogCategoriesByNameRequest(name),
  // createCategory: ({ name }: { name: string }) => createBlogCategoryRequest({ name }),
  // updateCategory: (params: { id: string; data: { name?: string } }) => updateBlogCategoryRequest(params),
  // deleteCategory: (id: string) => deleteBlogCategoryRequest(id),

  // Blog Comments APIs - CHƯA TẠO
  // getAllComments: (filters?: CommentFilters) => getBlogCommentsRequest(filters),
  // getCommentById: (id: string) => getBlogCommentByIdRequest(id),
  // getCommentsByPost: (postId: string, approvedOnly?: boolean) => getBlogCommentsByPostRequest(postId, approvedOnly),
  // getCommentsByUser: (userId: string, approvedOnly?: boolean) => getBlogCommentsByUserRequest(userId, approvedOnly),
  // createComment: (data: CreateBlogCommentData) => createBlogCommentRequest(data),
  // updateComment: (params: { id: string; data: UpdateBlogCommentData }) => updateBlogCommentRequest(params),
  // deleteComment: (id: string) => deleteBlogCommentRequest(id),
  // approveComment: (id: string) => approveBlogCommentRequest(id),
  // rejectComment: (id: string) => rejectBlogCommentRequest(id),
  // bulkApproveComments: (commentIds: string[]) => bulkApproveBlogCommentsRequest(commentIds),
  // bulkDeleteComments: (commentIds: string[]) => bulkDeleteBlogCommentsRequest(commentIds),
};
