import { BlogPost, SuccessResponse, User } from "@types";
import { useMutation, useQuery } from "react-query";
import axios from "axios";

const BACKEND_BASE_URL = process.env.REACT_APP_API_URL;
const ROUTE = "blogposts";

export const useRetrieveBlogPostById = (id: string) => {
  return useQuery(['blogPost', id], async () => {
    const { data } = await axios.get(`${BACKEND_BASE_URL}/${ROUTE}/${id}`);
    return data;
  });
};

export const useRetrieveBlogPosts = () => {
  return useQuery("blogPosts", async () => {
    const { data } = await axios.get(`${BACKEND_BASE_URL}/${ROUTE}/all`);
    return data;
  });
}

export const useCreateBlogPost = () => {
  return useMutation(
    async (body: PostRequestBody) => {
      return await axios.request({
        method: "POST",
        url: `${BACKEND_BASE_URL}/${ROUTE}/`,
        headers: {
          Userid: `${body.userId}`,
        },
        data: body,
      });
    }
  );
};

export type PostRequestBody = {
  title: string;
  content: string;
  userId?: string;
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
