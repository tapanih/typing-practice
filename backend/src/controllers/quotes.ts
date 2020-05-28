import { Quote } from "../models";
import { toQuote, toQuotes } from "../utils";
import { QuoteType } from "../types";

const addQuote = async (content: string): Promise<number> => {
  const quote = await Quote.create({
    content
  });

  return quote.id;
};

const getQuotes = async (): Promise<QuoteType[]> => {
  const quotes = toQuotes(await Quote.findAll({
    attributes: ['content']
  }));

  if (!quotes) {
    throw new Error("Quotes not found");
  }
  return quotes;
};

const getQuote = async (id: number): Promise<QuoteType> => {
  const quote = toQuote(await Quote.findByPk(id, {
    attributes: ['content']
  }));

  if (!quote) {
    throw new Error("Quote not found");
  }
  return quote;
};

export default {
  addQuote, getQuote, getQuotes
};