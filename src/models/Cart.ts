import BaseResponse from "./BaseResponse";
import { BookResponse } from "./Book";

export interface CartResponse extends BaseResponse {
  cartItems: CartItemResponse[];
  totalPrice: number;
}

export interface CartItemResponse extends BaseResponse {
  book: BookResponse;
  quantity: number;
  totalPrice: number;
}

export interface AddToCartRequest {
  bookId: string;
  quantity: number;
}

export interface RemoveFromCartRequest {
  bookId: string
}