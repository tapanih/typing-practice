import { apiBaseUrl } from "../constants";
import axios from "axios";
import { ResultType } from "../../../backend/src/types";

const addResult = async (result: ResultType) => {
  await axios.post<ResultType>(
    `${apiBaseUrl}/results`,
    result,
    { withCredentials: true }
  );
}

const getResults = async (): Promise<ResultType[]> => {
  const { data: results } = await axios.get<ResultType[]>(
    `${apiBaseUrl}/results`,
    { withCredentials: true }
  );
  return results;
}

export default {
  addResult, getResults
}