import { BlogPost, SuccessResponse, User } from "@types";
import { Service } from "use-http-service";

export interface IBlogPostsAPI {
  buildPost: () => Service;
  buildGetBlogPost: (args: { id: string }) => Service;
  buildPutBlogPost: (args: { id: string }) => Service;
  buildDeleteBlogPost: (args: { id: string }) => Service;
  buildPostPaginate: () => Service;
}

const ROUTE = "blogposts";

const BlogPostsAPI: IBlogPostsAPI = {
  buildPost: () => ({
    url: `${ROUTE}/`,
    method: "POST",
  }),
  buildGetBlogPost: ({ id }) => ({
    url: `${ROUTE}/${id}`,
    method: "GET",
  }),
  buildPutBlogPost: ({ id }) => ({
    url: `${ROUTE}/${id}`,
    method: "PUT",
  }),
  buildDeleteBlogPost: ({ id }) => ({
    url: `${ROUTE}/${id}`,
    method: "DELETE",
  }),
  buildPostPaginate: () => ({
    url: `${ROUTE}/paginate`,
    method: "POST",
  }),
};

export default BlogPostsAPI;

export type PostRequestBody = {
  title: string;
  content: string;
};
export type PostResponseBody = SuccessResponse<BlogPost>;

export type GetBlogPostResponseBody = SuccessResponse<BlogPost>;

export type PutBlogPostRequestBody = {
  title?: string;
  content?: string;
};
export type PutBlogResponseBody = SuccessResponse<BlogPost>;

export type DeleteBlogPostResponseBody = SuccessResponse<null>;

export type PostPaginateRequestBody = {
  limit?: number;
  cursor?: number;
};
export type PostPaginateResponseBody = SuccessResponse<{
  blogposts: BlogPost[];
  users: User[];
  has_more: boolean;
}>;
