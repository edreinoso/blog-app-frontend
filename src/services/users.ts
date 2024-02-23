import { SuccessResponse, User } from "@types";
import { Service } from "use-http-service";

export interface IUsersAPI {
  buildPostLogin: () => Service;
  buildPost: () => Service;
}

const ROUTE = "users";

const UsersAPI: IUsersAPI = {
  buildPostLogin: () => ({
    url: `${ROUTE}/login`,
    method: "POST",
  }),
  buildPost: () => ({
    url: `${ROUTE}/`,
    method: "POST",
  }),
};

export default UsersAPI;

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
