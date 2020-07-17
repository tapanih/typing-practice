import { RegisterFormFields } from "../components/RegisterForm";
import { apiBaseUrl } from "../constants";
import axios from "axios";
import { LoginDetails, LoggedUser, ForgotPasswordFormFields, ResetPasswordDetails, ChangePasswordDetails } from "../../../backend/src/types";

const register = async (details: RegisterFormFields) => {
  return await axios.post<RegisterFormFields>(
        `${apiBaseUrl}/auth/register`,
        details
  );
}

const confirmEmail = async (id: string): Promise<string> => {
  const { data: status } = await axios.get<string>(
    `${apiBaseUrl}/auth/confirm/${id}`
  );
  return status;
}

const login = async (details: LoginDetails) => {
  const { data: user } = await axios.post<LoggedUser>(
    `${apiBaseUrl}/auth/login`,
    details,
    { withCredentials: true }
  );
  window.localStorage.setItem(
    'loggedUser', JSON.stringify(user)
  );
  return user;
}

const logout = async () => {
  await axios.get<void>(
    `${apiBaseUrl}/auth/logout`,
    { withCredentials: true }
  );
  window.localStorage.removeItem("loggedUser");
}

const forgotPassword = async (details: ForgotPasswordFormFields) => {
  await axios.post(
    `${apiBaseUrl}/auth/forgotPassword`,
    details
  );
}

const resetPassword = async (details: ResetPasswordDetails) => {
  await axios.post(
    `${apiBaseUrl}/auth/resetPassword`,
    details
  );
}

const changePassword = async (details: ChangePasswordDetails) => {
  await axios.post(
    `${apiBaseUrl}/auth/changePassword`,
    details,
    { withCredentials: true }
  );
}

export default {
  register, confirmEmail, login, logout, forgotPassword, resetPassword, changePassword
}