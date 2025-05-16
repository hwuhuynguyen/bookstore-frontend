import BaseResponse from "./BaseResponse";
import { BookResponse } from "./Book";

export interface WishlistRequest {
  bookId: string;
}
export interface WishlistResponse extends BaseResponse {
  book: BookResponse;
}
