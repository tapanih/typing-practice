import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth';
import quoteRouter from './routes/quotes';
import resultRouter from './routes/results';
import configure from './config/passport';
import passport from 'passport';
import connectRedis from 'connect-redis';
import session from 'express-session';
import { redis } from './config/redis';
import { db } from './models';

const app = express();
const SESSION_SECRET = "kdsfjkdjdsj";
const FRONTEND_HOST = "http://localhost:3000";
const RedisStore = connectRedis(session);

(async () => {
  // TODO: development mode only
  await redis.flushall();

  // letting tests handle database creation by themselves
  if (process.env.NODE_ENV !== "test") {
    await db.sync({ force: true });
  }

  app.use(session({
      store: new RedisStore({ client: redis }),
      name: "session_id",
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7
      }
    }));

  configure(passport);
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.json());
    
  const corsOptions = {
    credentials: true,
    origin: FRONTEND_HOST
  };

  app.use(cors(corsOptions));

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