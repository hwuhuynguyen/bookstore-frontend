import { AddressResponse } from "./Address";
import { BookResponse } from "./Book";
import { TransactionResponse } from "./Payment";

export interface OrderRequest {
  addressId: string;
  paymentTypeId: number;
}

export interface OrderResponse {
  id: string;
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