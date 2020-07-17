import express from 'express';
import controller from '../controllers/auth';
import { toRegisterDetails, toEmail, toResetPasswordDetails } from '../utils';
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

router.get("/confirm/:key", async (req, res) => {
  const { key } = req.params;
  const userId = Number(await redis.get(key));
  if (userId) {
    const setConfirmedPromise = controller.setConfirmed(userId);
    const deleteKeyPromise = redis.del(key);
    await Promise.all([setConfirmedPromise, deleteKeyPromise]);
    res.send("accepted");
  } else {
    res.send("rejected");
  }
});

router.post("/forgotPassword", (req, res) => {
  try {
    res.status(200).send();
    const email = toEmail(req.body);
    void controller.forgotPassword(email);
  } catch (error) {
    console.log(error);
  }
});

router.post("/resetPassword", async (req, res) => {
  try {
    const { key, newPassword } = toResetPasswordDetails(req.body);
    const userId = Number(await redis.get(`forgot:${key}`));
    if (userId && await controller.resetPassword(userId, newPassword)) {
      await redis.del(`forgot:${key}`);
      res.status(200).send("accepted");
    } else {
      res.status(401).send("rejected by server");
    }
  } catch (error) {
    res.status(400).send();
  }
});

export default router;