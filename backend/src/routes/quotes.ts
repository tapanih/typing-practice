import express from 'express';
import controller from '../controllers/quotes';
import { toQuote } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  controller.getQuotes()
    .then((quotes) => res.status(200).send(quotes))
    .catch(() => res.status(404).send());
});

router.get('/random', (_req, res) => {
  controller.getRandomQuote()
    .then((quote) => res.status(200).send(quote))
    .catch(() => res.status(404).send());
});

router.post('/', (req, res) => {
  try {
    const quote = toQuote(req.body);
    controller.addQuote(quote)
      .then(() => res.status(201).send())
      .catch(() => res.status(404).send());
  } catch (e) {
    res.status(400).send("Missing or invalid content.");
  }
});

export default router;