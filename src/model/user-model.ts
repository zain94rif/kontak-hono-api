import { use } from "hono/jsx";
import { User } from "../generated/prisma";

export type RegisterUserRequest = {
  username: string;
  password: string;
  name: string;
};

export type LoginUserRequest = {
  username: string;
  password: string;
};

export type UpdateUserRequest = {
  password?: string;
  name?: string;
};

export type UserResponse = {
  username: string;
  name: string;
  token?: string;
};

export function toUserResponse(user: User): UserResponse {
  return {
    name: user.name,
    username: user.username,
  };
}
