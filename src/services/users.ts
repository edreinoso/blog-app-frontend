import { SuccessResponse, User } from "@types";
import { useMutation } from "react-query";
import axios from "axios";

const ROUTE = "users";
const BACKEND_BASE_URL = process.env.REACT_APP_API_URL;;

export const useCreateUser = () => {
  return useMutation (
    async (body: PostRequestBody) => {
      return await axios.request({
        method: "POST",
        url: `${BACKEND_BASE_URL}/${ROUTE}/`,
        data: body
      })
    }
  )
}

export const useLoginUser = () => {
  return useMutation (
    async (body: PostLoginRequestBody) => {
      return await axios.request({
        method: "POST",
        url: `${BACKEND_BASE_URL}/${ROUTE}/login`,
        data: body
      })
    }
  )
}

export type PostLoginRequestBody = {
  email: string;
  password: string;
};
export type PostLoginResponseBody = SuccessResponse<User>;

export type PostRequestBody = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};
export type PostResponseBody = SuccessResponse<User>;
