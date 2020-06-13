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

const login = async (details: LoginDetails) => {
  const { data: user } = await axios.post<LoggedUser>(
    `${apiBaseUrl}/auth/login`,
    details
  );
  window.localStorage.setItem(
    'loggedUser', JSON.stringify(user)
  );
  return user;
}

const logout = () => {
  window.localStorage.removeItem("loggedUser");
}

export default {
  register, login, logout
}