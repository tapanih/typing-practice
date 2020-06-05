import express from 'express';
import jsonwebtoken from 'jsonwebtoken';
import controller from '../controllers/auth';
import { toLoginDetails } from '../utils';
import passport from 'passport';

const router = express.Router();

router.get('/protected', passport.authenticate('jwt', { session: false }), (_req, res) => {
    res.status(200).send("Huge success!");
});

router.post('/register', (req, res) => {
  try {
    const { username, password } = toLoginDetails(req.body);
    controller.register(username, password)
      .then(_user => res.status(201).send())
      .catch(() => res.status(401).send());
  } catch (error) {
    res.status(400).send();
  }
});

router.post('/login', (req, res) => {
  try {
    const { username, password } = toLoginDetails(req.body);
    controller.login(username, password)
      .then(user => {
        const payload = {
          sub: user.id,
          iat: Date.now()
        };
        const token = jsonwebtoken.sign(payload, "SECRET", { expiresIn: "1d" });
        res.status(200).send({ token: `Bearer ${token}`, expiresIn: "1d" });

      }).catch(() => res.status(401).send());
  } catch (error) {
    res.status(400).send();
  }
});

export default router;