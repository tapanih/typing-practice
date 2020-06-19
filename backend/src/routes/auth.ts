import express from 'express';
import jsonwebtoken from 'jsonwebtoken';
import controller from '../controllers/auth';
import { toLoginDetails } from '../utils';
import { LoggedUser } from '../types';
import { redis } from '../config/redis';

const router = express.Router();

router.post('/register', (req, res) => {
  try {
    const { username, password, email } = toLoginDetails(req.body);
    controller.register(username, password, email)
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
          id: user.id,
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

router.get("/confirm/:id", async (req, res) => {
  const { id } = req.params;
  const userId = await redis.get(id);
  if (userId) {
    //TODO: set user as confirmed
    await redis.del(id);
    res.send("email confirmed");
  } else {
    res.send("invalid or expired link");
  }
});

export default router;