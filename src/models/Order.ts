import { AddressResponse } from "./Address";
import { BookResponse } from "./Book";
import { TransactionResponse } from "./Payment";
import { UserResponse } from "./User";

export interface OrderRequest {
  addressId: string;
  paymentTypeId: number;
}

export interface OrderResponse {
  id: string;
  siteUser: UserResponse
  orderItems: OrderItemResponse[];
  payment: TransactionResponse;
  totalAmount: number;
  orderStatus: string;
  shippingAddress: AddressResponse;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItemResponse {
  id: string;
  book: BookResponse;
  quantity: number;
  pricePerUnit: number;
  subtotal: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderPaymentResponse {
  id: string;
  orderItems: OrderItemResponse[];
  totalAmount: number;
  orderStatus: string;
  shippingAddress: AddressResponse;
  createdAt: string;
  updatedAt: string;
}