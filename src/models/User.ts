import { AddressResponse } from "./Address";
import BaseResponse from "./BaseResponse";

export interface UserRequest {
  username: string;
  password: string;
  confirmedPassword: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export interface UserResponse extends BaseResponse {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  addresses: AddressResponse[];
  avatar: string | null;
  roles: RoleResponse[];
}

export interface RoleResponse {
  code: string;
  name: string;
}
