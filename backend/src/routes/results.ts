import express from 'express';
import passport from 'passport';
import { toResult } from '../utils';
import controller from '../controllers/results';

const router = express.Router();

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  try {
    const result = toResult(req.body, req.user);
    controller.addResult(result)
      .then(() => res.status(201).send())
      .catch(() => res.status(404).send());
  } catch (e) {
    res.status(400).send("Missing or invalid result.");
  }
});

export default router;