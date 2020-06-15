import { apiBaseUrl } from "../constants";
import axios from "axios";
import { ResultType } from "../../../backend/src/types";
import authHeader from "../helpers/authHeader";

const addResult = async (result: ResultType) => {
  await axios.post<ResultType>(
    `${apiBaseUrl}/results`,
    result,
    { headers: authHeader() }
  );
}

const getResults = async (): Promise<ResultType[]> => {
  const { data: results } = await axios.get<ResultType[]>(
    `${apiBaseUrl}/results`,
    { headers: authHeader() }
  );
  return results;
}

export default {
  addResult, getResults
}