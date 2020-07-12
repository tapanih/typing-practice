import { apiBaseUrl } from "../constants";
import axios from "axios";
import { QuoteType } from "../../../backend/src/types";

const addQuote = async (quote: QuoteType) => {
  await axios.post<QuoteType>(
    `${apiBaseUrl}/quotes`,
    quote,
    { withCredentials: true }
  );
}

const getRandom = async () => {
  const { data: randomQuote } = await axios.get<QuoteType>(
    `${apiBaseUrl}/quotes/random`
  );
  return randomQuote;
}

export default {
  addQuote, getRandom
}