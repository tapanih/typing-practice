import * as passportJwt from 'passport-jwt';
import { User } from '../models/index';
import { PassportStatic } from 'passport';

const ExtractJwt = passportJwt.ExtractJwt;
const JwtStrategy = passportJwt.Strategy;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "SECRET"
};

const configure = (passport: PassportStatic): void => {
  passport.use(new JwtStrategy(options, (jwt_payload, done) => {

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const sub = jwt_payload.sub as number;

    User.findOne({
      where: {
        id: sub
      }
    }).then(user => {
      if (user === null) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    }).catch(err => done(err, false));
  }));
};

export default configure;