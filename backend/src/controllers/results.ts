import { Result } from "../models";
import { ResultType } from "../types";

const addResult = async (result: ResultType): Promise<number> => {
  const newResult = await Result.create(result);
  return newResult.id;
};

const getResultsByUserId = async (userId: number): Promise<Result[]> => {
  const results = await Result.findAll({
    where: {
      userId: userId
    },
    attributes: ['wpm', 'accuracy', 'createdAt'],
    order: [['createdAt', 'DESC']]
  });
  return results;
};

export default {
  addResult, getResultsByUserId
};