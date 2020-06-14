import { Result } from "../models";
import { ResultType } from "../types";

const addResult = async (result: ResultType): Promise<number> => {
  const newResult = await Result.create(result);
  return newResult.id;
};

export default {
  addResult
};