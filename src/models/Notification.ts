export interface NotificationResponse {
  id: string;
  type: NotificationType;
  message: string;
  anchor: string | null;
  read: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationRequest {
  id: string;
  userId: string;
  type: NotificationType;
  message: string;
  anchor: string | null;
  isRead: boolean;
}

export enum NotificationType {
  ORDER_PLACED = "ORDER_PLACED",
  ORDER_DELIVERING = "ORDER_DELIVERING",
  ORDER_DELIVERED = "ORDER_DELIVERED",
  ORDER_CANCELLED = "ORDER_CANCELLED",
  PAYMENT_SUCCESS = "PAYMENT_SUCCESS",
  PAYMENT_FAILED = "PAYMENT_FAILED",
  PAYMENT_REFUNDED = "PAYMENT_REFUNDED",
  ACCOUNT_CREATED = "ACCOUNT_CREATED",
  PASSWORD_RESET = "PASSWORD_RESET",
  PROMOTION_OFFER = "PROMOTION_OFFER",
  DEMOTION_OFFER = "DEMOTION_OFFER",
}

export interface EventInitiationResponse {
  eventSourceUuid: string;
}
