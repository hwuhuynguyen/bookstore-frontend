import { ListResponse } from "../utils/FetchUtils";
import BaseResponse from "./BaseResponse";
import { BookResponse } from "./Book";
import { UserResponse } from "./User";

export interface ReviewResponse extends BaseResponse {
  book: BookResponse;
  user: UserResponse;
  rating: number;
  comment: string;
  verifiedPurchase: boolean;
}

export interface RatingDistributionItem {
  stars: number;
  count: number;
}

export interface ReviewPageWrapper {
  pageData: ListResponse<ReviewResponse>;
  ratingDistribution: RatingDistributionItem[];
}
