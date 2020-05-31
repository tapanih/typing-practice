import { Quote, db } from "../models";
import { toQuote, toQuotes } from "../utils";
import { QuoteType } from "../types";

const addQuote = async (quote: QuoteType): Promise<number> => {
  const newQuote = await Quote.create({
    content: quote.content
  });

  return newQuote.id;
};

const getRandomQuote = async (): Promise<QuoteType> => {
  const quote = toQuote(await Quote.findOne({ 
    order: db.random()
  }));

  if (!quote) {
    throw new Error("Quote not found");
  }

  return quote;
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
  addQuote, getRandomQuote, getQuote, getQuotes
};