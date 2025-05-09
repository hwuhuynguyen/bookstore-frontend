import { AuthorResponse } from "./Author";
import BaseResponse from "./BaseResponse";
import { CategoryResponse } from "./Category";

export interface BookResponse extends BaseResponse {
  isbn: string;
  title: string;
  slug: string;
  description: string;
  bookCover: string;
  publicationDate: string; // ISO string
  publisher: string;
  imageUrl: string;
  numberOfPages: number;
  averageRating: number;
  ratingCount: number;
  reviewCount: number;
  price: number;
  categories: CategoryResponse[];
  authors: AuthorResponse[];
  inventory: number;
}

