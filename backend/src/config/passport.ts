import bcrypt from 'bcrypt';
import { User } from '../models/index';
import { PassportStatic } from 'passport';
import { parseId } from '../utils';
import * as passportLocal from 'passport-local';

const LocalStrategy = passportLocal.Strategy;

const configure = (passport: PassportStatic): void => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  passport.use(new LocalStrategy(async (username: string, password: string, done) => {
    try {
      const user = await User.findOne({
          where: {
            username: username
          }
        });

      const isValid = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash);

      if (!(user && isValid)) {
        return done(null, false, { message: 'wrong username or password' });
      }

      if (!user.confirmed) {
        return done(null, false, { message: 'please confirm your email' });
      }
    
      return done(null, user);
    } catch (err) {
      done(err, false);
    }
  }));

  passport.serializeUser((user: User, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({
      where: {
        id: parseId(id)
      }
    }).then(user => {
      done(null, user);
    }).catch(err => {
      done(err);
    });
  });
};

export default configure;