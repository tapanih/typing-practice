export interface LoginDetails {
  username: string;
  password: string;
}

export interface QuoteType {
  id?: number;
  content: string;
}

export interface LoggedUser {
  username: string;
  token: string;
  expiresIn: string;
}