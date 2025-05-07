import BaseResponse from "./BaseResponse";

export interface UserResponse extends BaseResponse {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: any[];
  avatar: string | null;
  roles: any[];
}