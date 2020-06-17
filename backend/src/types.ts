export interface LoginDetails {
  username: string;
  password: string;
}

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

export interface LoggedUser {
  id: number;
  username: string;
  token: string;
  expiresIn: string;
}