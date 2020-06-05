import bcrypt from 'bcrypt';
import { User } from "../models";

const BCRYPT_ROUNDS = 12;

const register = async (username: string, password: string): Promise<User> => {
  const user = await User.findOne({
      where: {
        username: username
      }
    });
  if (user != null) {
    throw new Error("username taken");
  } else {
    const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);
    return await User.create({ username, passwordHash });
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
