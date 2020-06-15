import express from 'express';
import passport from 'passport';
import { toResult, toUserId } from '../utils';
import controller from '../controllers/results';

const router = express.Router();

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  try {
    const result = toResult(req.body, req.user);
    controller.addResult(result)
      .then(() => res.status(201).send())
      .catch(() => res.status(404).send());
  } catch (error) {
    console.log(error);
    res.status(400).send("Missing or invalid result.");
  }
});

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  try {
    const userId = toUserId(req.user);
    controller.getResultsByUserId(userId)
      .then((results) => res.status(200).send(results))
      .catch(() => res.status(404).send());
  } catch (error) {
    console.log(error);
    res.status(400).send("Missing or invalid user");
  }
});

export default router;