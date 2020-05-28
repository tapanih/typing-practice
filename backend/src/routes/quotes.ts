import express from 'express';
import controller from '../controllers/quotes'

const router = express.Router();

router.get('/', (_req, res) => {
  res.send('Fetching quotes!');
});

router.post('/', (req, res) => {
  controller.addQuote(req.body.content)
    .then(() => res.status(201).send());
});

export default router;