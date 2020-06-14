import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth';
import quoteRouter from './routes/quotes';
import resultRouter from './routes/results';
import configure from './config/passport';
import passport from 'passport';

const app = express();

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
});