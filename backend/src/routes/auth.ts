import express from 'express';
import jsonwebtoken from 'jsonwebtoken';
import controller from '../controllers/auth';
import { toLoginDetails } from '../utils';
import { LoggedUser } from '../types';

const router = express.Router();

router.post('/register', (req, res) => {
  try {
    const { username, password } = toLoginDetails(req.body);
    controller.register(username, password)
      .then(_user => res.status(201).send())
      .catch(() => res.status(401).send("username taken"));
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
        const userInfo: LoggedUser = {
          username: user.username,
          token: token,
          expiresIn: "1d"
        };
        res.status(200).send(userInfo);

      }).catch(() => res.status(401).send("wrong username or password"));
  } catch (error) {
    res.status(400).send();
  }
});

export default router;