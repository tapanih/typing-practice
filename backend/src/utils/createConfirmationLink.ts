import { v4 as uuidv4 } from 'uuid';
import { redis } from '../config/redis';

export const createConfirmationLink = async (userId: number): Promise<string> => {
  const id = uuidv4();
  await redis.set(id, userId, "ex", 60 * 60 * 24);
  return `http://localhost:3000/confirm/${id}`;
};