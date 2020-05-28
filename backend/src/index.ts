import express from 'express';
import cors from 'cors';
import quoteRouter from './routes/quotes';
const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/quotes', quoteRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});