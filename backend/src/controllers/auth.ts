import bcrypt from 'bcrypt';
import { Result } from 'type-result';
import { User } from "../models";
import { sendEmail } from '../utils/sendEmail';
import { createConfirmationLink } from '../utils/createConfirmationLink';
import { Op } from 'sequelize';
import { ServerError } from '../types';

const BCRYPT_ROUNDS = 12;

const register = async (username: string, password: string, email: string): Promise<Result<User, ServerError>> => {
  const user = await User.findOne({
      where: {
        [Op.or]: [
          { username: username },
          { email: email }
        ]
      }
    });
  if (user != null) {
    if (user.username === username) {
      return Result.fail({ type: "username", message: "username taken" });
    } else {
      return Result.fail({ type: "email", message: "email taken" });
    }
  } else {
    const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);
    const newUser = await User.create({ email, username, passwordHash, confirmed: false });
    const confirmationLink = await createConfirmationLink(newUser.id);
    await sendEmail(email, confirmationLink);
    return Result.ok(newUser);
  }
};

const login = async (username: string, password: string): Promise<Result<User, string>> => {
  const user = await User.findOne({
      where: {
        username: username
      }
    });

  const isValid = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash);

  if (!(user && isValid)) {
    return Result.fail('wrong username or password');
  }

  if (!user.confirmed) {
    return Result.fail("email not confirmed");
  }
    
  return Result.ok(user);
};

const setConfirmed = async (userId: number): Promise<void> => {
  await User.update({ confirmed: true },
    { where: {
      id: userId
    }});
};

export default {
  register, login, setConfirmed
};
