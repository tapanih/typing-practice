import express from 'express';
import controller from '../controllers/auth';
import { toRegisterDetails } from '../utils';
import { LoggedUser } from '../types';
import { redis } from '../config/redis';
import passport from 'passport';
import { User } from '../models';
import { IVerifyOptions } from 'passport-local';

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

router.post('/login', (req, res, next) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  passport.authenticate('local', (err, user: User, info: IVerifyOptions) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.status(401).send(info.message);
    } else {
      req.login(user, (err) => {
        if (err) {
          return next(err);
        } else {
          const userInfo: LoggedUser = {
            id: user.id,
            username: user.username,
          };
          res.status(200).send(userInfo);
        }
      });
    }
  })(req, res, next);
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