import BaseResponse from "./BaseResponse";

export interface InventoryRequest {
  bookId: string;
  stockCount: number;
}

export interface InventoryResponse extends BaseResponse {
  bookId: string;
  bookTitle?: string;
  stockCount: number;
}

export interface InventoryUpdateStockRequest {
  quantity: number;
  add: boolean
}