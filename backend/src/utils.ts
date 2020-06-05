import { QuoteType, LoginDetails } from "./types";

const isObject = (x: unknown): x is Record<string, unknown> => {
  return typeof x === 'object' && x != null;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseContent = (content: unknown): string => {
  if (!content || !isString(content)) {
    throw new Error("Incorrect or missing content");
  }
  return content;
};

const parseUsername = (username: unknown): string => {
  if (!username || !isString(username)) {
    throw new Error("Incorrect or missing username");
  }
  return username;
};

const parsePassword = (password: unknown): string => {
  if (!password || !isString(password) || password.length > 64) {
    throw new Error("Incorrect or missing password");
  }
  return password;
};

export const toLoginDetails = (obj: unknown): LoginDetails => {
  if (!isObject(obj)) {
    throw new Error("LoginDetails is not an object");
  }
  return {
    username: parseUsername(obj.username),
    password: parsePassword(obj.password)
  };
};

export const toQuote = (obj: unknown): QuoteType => {
  if (!isObject(obj)) {
    throw new Error("Quote is not an object");
  }
  return {
    content: parseContent(obj.content)
  };
};

export const toQuotes = (array: unknown): QuoteType[] => {
  if (!Array.isArray(array)) {
    return [];
  }
  return Object.values(array).map((obj: unknown) => toQuote(obj));
};