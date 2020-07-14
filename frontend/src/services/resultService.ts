import { apiBaseUrl } from "../constants";
import axios from "axios";
import { ResultType, ResultDetails } from "../../../backend/src/types";

const addResult = async (result: ResultDetails) => {
  await axios.post<ResultDetails>(
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