import bcrypt from 'bcrypt';
import { User } from "../models";
import { sendEmail } from '../utils/sendEmail';
import { createConfirmationLink } from '../utils/createConfirmationLink';

const BCRYPT_ROUNDS = 12;

const register = async (username: string, password: string, email: string): Promise<User> => {
  const user = await User.findOne({
      where: {
        username: username
      }
    });
  if (user != null) {
    throw new Error("username taken");
  } else {
    const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);
    const newUser = await User.create({ username, passwordHash });
    const confirmationLink = await createConfirmationLink(newUser.id);
    await sendEmail(email, confirmationLink);
    return newUser;
  }
};

const login = async (username: string, password: string): Promise<User> => {
  const user = await User.findOne({
      where: {
        username: username
      }
    });

  const isValid = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash);

  if (!(user && isValid)) {
    throw new Error('Incorrect username or password');
  }
    
  return user;
};

export default {
  register, login
};
