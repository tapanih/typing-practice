import bcrypt from 'bcrypt';
import { Result } from 'type-result';
import { User } from "../models";
import { sendConfirmationEmail, sendForgotPasswordEmail, sendPasswordChangedEmail } from '../utils/sendEmail';
import { createConfirmationLink, createForgotPasswordLink } from '../utils/links';
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
    await sendConfirmationEmail(email, confirmationLink);
    return Result.ok(newUser);
  }
};

const setConfirmed = async (userId: number): Promise<void> => {
  await User.update({ confirmed: true },
    { where: {
      id: userId
    }});
};

const forgotPassword = async (email: string): Promise<void> => {
  const user = await User.findOne({
    where: { email }
  });
  if (user != null) {
    const forgotPasswordLink = await createForgotPasswordLink(user.id);
    void sendForgotPasswordEmail(email, forgotPasswordLink);
  }
};

const resetPassword = async (userId: number, newPassword: string): Promise<boolean> => {
  const passwordHash = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);
  const [rows, users] = await User.update(
    { passwordHash },
    { where: { id: userId }, returning: true }
  );
  if (rows === 1) {
    const user = users[0];
    void sendPasswordChangedEmail(user.email);
    return true;
  } else {
    return false;
  }
};

export default {
  register, setConfirmed, forgotPassword, resetPassword
};
