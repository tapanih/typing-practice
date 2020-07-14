export interface RegisterDetails {
  username: string;
  password: string;
  email: string;
}

export type LoginDetails = Omit<RegisterDetails, "email">;

export interface QuoteType {
  id?: number;
  content: string;
}

export interface ResultType {
  id?: number;
  createdAt?: string;
  wpm: number;
  accuracy: number;
  userId: number;
  quoteId: number;
}

export type ResultDetails = Omit<ResultType, "userId">;

export interface LoggedUser {
  id: number;
  username: string;
}

export interface ServerError {
  type: string;
  message: string;
}