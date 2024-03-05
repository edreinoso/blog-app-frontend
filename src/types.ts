import { Action } from "redux";

export type ErrorResponse = {
  errors: string[];
};

export type SuccessResponse<T> = {
  data: T;
};

export type UniqueEntity = {
  id: string;
  created_at: number;
  modified_at: number;
};

export type User = UniqueEntity & {
  first_name: string;
  last_name: string;
  email: string;
  image_path?: string;
};

export type BlogPost = UniqueEntity & {
  title: string;
  content: string;
  user_id: string;
};

export type AuthState =
  | {
      isAuthenticated: true;
      user: User;
    }
  | {
      isAuthenticated: false;
      user: undefined;
    };

export type ApplicationState = {
  auth: AuthState;
};

export interface StateAction extends Action {
  type: string;
  payload?: any;
}

export interface RootState {
  auth: {
    user: {
      id: string;
    };
  };
}