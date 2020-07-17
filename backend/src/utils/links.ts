import { v4 as uuidv4 } from 'uuid';
import { redis } from '../config/redis';

export const createConfirmationLink = async (userId: number): Promise<string> => {
  const id = uuidv4();
  await redis.set(id, userId, "ex", 60 * 60 * 24);
  return `http://localhost:3000/confirm/${id}`;
};

export const createForgotPasswordLink = async (userId: number): Promise<string> => {
  const id = uuidv4();
  await redis.set(`forgot:${id}`, userId, "ex", 60 * 30);
  return `http://localhost:3000/resetPassword/${id}`;
};