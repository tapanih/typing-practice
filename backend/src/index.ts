import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth';
import quoteRouter from './routes/quotes';
import resultRouter from './routes/results';
import configure from './config/passport';
import passport from 'passport';
import { redis } from './config/redis';

const app = express();

(async () => {
  // TODO: development mode only
  await redis.flushall();

  configure(passport);
  app.use(passport.initialize());
  app.use(express.json());
  app.use(cors());

  app.use('/api/auth', authRouter);
  app.use('/api/quotes', quoteRouter);
  app.use('/api/results', resultRouter);

  const PORT = 3001;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    app.emit("ready");
  });
})().catch(error => console.log(error));

export default app;