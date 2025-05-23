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
  source: SourceResponse;
  inventory: number;
}

interface SourceResponse {
  id: string;
  name: string;
}

export interface BookRequest {
  id?: string;
  isbn: string;
  title: string;
  slug?: string;
  description?: string;
  bookCover?: string;
  publicationDate: string; // ISO date string (e.g., "2024-05-22")
  publisher: string;
  imageUrl?: string;
  numberOfPages?: number;
  price: number;
  categories: string[]; // UUIDs as strings
  authors: string[]; // UUIDs as strings
  inventory: number;
  source: number;
}