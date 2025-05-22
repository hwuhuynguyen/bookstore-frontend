export interface AuthorResponse {
  id: string;
  name: string;
  totalBooks: number;
  createdAt: string;
  updatedAt: string;
}

export interface AuthorRequest {
  id: string;
  name: string;
}