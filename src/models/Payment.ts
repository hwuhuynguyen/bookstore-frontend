import { OrderPaymentResponse } from "./Order";

export interface TransactionResponse {
  id: string;
  paymentType: string;
  order: OrderPaymentResponse;
  transactionId: string;
  amount: number;
  paymentStatus: string;
  paymentDetails: string;
  createdAt: string;
  updatedAt: string;
}

export interface VnPayResponse {
  orderId: string;
  paymentUrl?: string;
}
