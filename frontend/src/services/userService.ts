import { RegisterFormFields } from "../components/RegisterForm";
import { apiBaseUrl } from "../constants";
import axios from "axios";
import { LoginDetails, LoggedUser } from "../../../backend/src/types";

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

export default {
  register, confirmEmail, login, logout
}