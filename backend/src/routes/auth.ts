import express from 'express';
import jsonwebtoken from 'jsonwebtoken';
import controller from '../controllers/auth';
import { toLoginDetails, toRegisterDetails } from '../utils';
import { LoggedUser } from '../types';
import { redis } from '../config/redis';

const router = express.Router();

router.post('/register', (req, res) => {
  try {
    const { username, password, email } = toRegisterDetails(req.body);
    controller.register(username, password, email)
      .then(result => {
        if (result.isSuccess) {
          res.status(201).send("OK");
        } else {
          res.status(401).send(result.getError());
        }
      }).catch((error) => {
        console.log(error);
        res.status(401).send("unexpected error");
      });
  } catch (error) {
    res.status(400).send();
  }
});

router.post('/login', (req, res) => {
  try {
    const { username, password } = toLoginDetails(req.body);
    controller.login(username, password)
      .then(result => {
        if (result.isSuccess) {
          const user = result.getValue();
          const payload = {
            sub: user.id,
            iat: Date.now()
          };
          if (process.env.JWT_SECRET) {
            const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
            const userInfo: LoggedUser = {
              id: user.id,
              username: user.username,
              token: token,
              expiresIn: "1d"
            };
            res.status(200).send(userInfo);
          } else {
            console.log("Error: environment variable JWT_SECRET does not exist.");
            res.status(401).send("unexpected error");
          }
        } else {
          res.status(401).send(result.getError());
        }
      }).catch(() => res.status(401).send("unexpected error"));
  } catch (error) {
    res.status(400).send();
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  res.status(204).send();
});

router.get("/confirm/:id", async (req, res) => {
  const { id } = req.params;
  const userId = Number(await redis.get(id));
  if (userId) {
    await controller.setConfirmed(userId);
    await redis.del(id);
    res.send("accepted");
  } else {
    res.send("rejected");
  }
});

export default router;