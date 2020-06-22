import { redis } from "../src/config/redis";
import app from "../src";

export const mochaHooks = {
  beforeAll: [
    (done: () => void): void => {
      app.on("ready", () => done());
    }
  ],
  afterAll: [
    (): void => {
      redis.disconnect();
    }
  ],
};