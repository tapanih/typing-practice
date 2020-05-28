import { QuoteType } from "./types";

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
  return name;
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