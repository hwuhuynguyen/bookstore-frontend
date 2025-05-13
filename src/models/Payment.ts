import { OrderResponse } from "./Order";

export interface TransactionResponse {
  id: string;
  paymentType: string;
  order: OrderResponse;
  transactionId: string;
  amount: number;
  paymentStatus: string;
  paymentDetails: string;
  createdAt: string;
  updatedAt: string;
}

export interface VnPayResponse {
  paymentUrl: string;
}
