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

export default {
  addResult
}