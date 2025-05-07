import BaseResponse from "./BaseResponse";

export interface AddressRequest {
  address: string;
  isDefault: boolean;
}

export interface AddressResponse extends BaseResponse {
  address: string;
  isDefault: boolean;
}