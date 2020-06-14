import { apiBaseUrl } from "../constants";
import axios from "axios";
import { QuoteType } from "../../../backend/src/types";
import authHeader from "../helpers/authHeader";

const addQuote = async (quote: QuoteType) => {
  await axios.post<QuoteType>(
    `${apiBaseUrl}/quotes`,
    quote,
    { headers: authHeader() }
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