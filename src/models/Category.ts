export interface CategoryResponse {
  id: string;
  name: string;
  totalBooks: number;
  createdAt: string;
  updatedAt: string;
}


export interface CategoryRequest {
  id: string;
  name: string;
}