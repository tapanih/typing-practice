import { redis } from "../src/config/redis";
import app from "../src";
import { db } from "../src/models";

export const mochaHooks = {
  beforeAll: [
    (done: () => void): void => {
      app.on("ready", () => done());
    },
    async (): Promise<void> => {
      await db.sync({ force: true });
    }
  ],
  afterAll: [
    async (): Promise<void> => {
      redis.disconnect();
      await db.close();
    }
  ],
};