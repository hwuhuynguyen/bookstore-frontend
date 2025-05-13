import { AddressResponse } from "./Address";
import { BookResponse } from "./Book";
import { VnPayResponse } from "./Payment";

export interface OrderRequest {
  addressId: string;
  paymentTypeId: number;
}

export interface OrderResponse {
  id: string;
  orderItems: OrderItemResponse[];
  payment: VnPayResponse;
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
