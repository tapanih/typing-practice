import { QuoteType, LoginDetails, ResultType, RegisterDetails, ResetPasswordDetails, ChangePasswordDetails } from "../types";

const isObject = (x: unknown): x is Record<string, unknown> => {
  return typeof x === 'object' && x != null;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isNumber = (value: unknown): value is number => {
  return typeof value === 'number' && isFinite(value);
};

export const parseContent = (content: unknown): string => {
  if (!content || !isString(content) || content.length > 512) {
    throw new Error("Incorrect or missing content");
  }
  return content;
};

export const parseUsername = (username: unknown): string => {
  if (!username || !isString(username)) {
    throw new Error("Incorrect or missing username");
  }
  return username;
};

export const parsePassword = (password: unknown): string => {
  if (!password || !isString(password) || password.length > 64) {
    throw new Error("Incorrect or missing password");
  }
  return password;
};

// https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html#Email_Address_Validation
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+$/i;

export const parseEmail = (email: unknown): string => {
  if (!email || !isString(email) || email.length > 254 || !EMAIL_REGEX.test(email)) {
    throw new Error("Incorrect or missing email");
  }

  const [local, domain] = email.split("@");
  if (domain.length == 0 || local.length == 0 || local.length > 63) {
    throw new Error("Incorrect or missing email");
  }

  return email;
};

export const parseWPM = (wpm: unknown): number => {
  if (!wpm || !isNumber(wpm) || wpm <= 0 || wpm > 400 || wpm % 1 !== 0) {
    throw new Error("Incorrect or missing WPM");
  }
  return wpm;
};

export const parseAccuracy = (accuracy: unknown): number => {
  if (!accuracy || !isNumber(accuracy) || accuracy <= 0 || accuracy > 100 || accuracy % 1 !== 0) {
    throw new Error("Incorrect or missing accuracy");
  }
  return accuracy;
};

export const parseId = (id: unknown): number => {
  if (!id || !isNumber(id)) {
    throw new Error("Incorrect or missing id");
  }
  return id;
};

export const parseKey = (key: unknown): string => {
  if (!key || !isString(key)) {
    throw new Error("Incorrect or missing key");
  }
  return key;
};

export const toLoginDetails = (obj: unknown): LoginDetails => {
  if (!isObject(obj)) {
    throw new Error("LoginDetails is not an object");
  }
  return {
    username: parseUsername(obj.username),
    password: parsePassword(obj.password)
  };
};

export const toRegisterDetails = (obj: unknown): RegisterDetails => {
  if (!isObject(obj)) {
    throw new Error("RegisterDetails is not an object");
  }
  return {
    username: parseUsername(obj.username),
    password: parsePassword(obj.password),
    email: parseEmail(obj.email)
  };
};

export const toQuote = (obj: unknown): QuoteType => {
  if (!isObject(obj)) {
    throw new Error("Quote is not an object");
  }
  return {
    id: obj.id !== undefined ? parseId(obj.id) : undefined,
    content: parseContent(obj.content)
  };
};

export const toQuotes = (array: unknown): QuoteType[] => {
  if (!Array.isArray(array)) {
    return [];
  }
  return Object.values(array).map((obj: unknown) => toQuote(obj));
};

export const toResult = (body: unknown, user: unknown): ResultType => {
  if (!isObject(body) || !isObject(user)) {
    throw new Error("Result is not an object");
  }
  return {
    wpm: parseWPM(body.wpm),
    accuracy: parseAccuracy(body.accuracy),
    userId: parseId(user.id),
    quoteId: parseId(body.quoteId)
  };
};

export const toUserId = (user: unknown): number => {
  if (!isObject(user)) {
    throw new Error("User is not an object");
  }
  return parseId(user.id);
};

export const toEmail = (body: unknown): string => {
  if (!isObject(body)) {
    throw new Error("Incorrect or missing email");
  }
  return parseEmail(body.email);
};

export const toResetPasswordDetails = (body: unknown): ResetPasswordDetails => {
  if (!isObject(body)) {
    throw new Error("Request body is not an object");
  }
  return {
    key: parseKey(body.key),
    newPassword: parsePassword(body.newPassword)
  };
};

export const toChangePasswordDetails = (body: unknown): ChangePasswordDetails => {
  if (!isObject(body)) {
    throw new Error("Request body is not an object");
  }
  return {
    oldPassword: parsePassword(body.oldPassword),
    newPassword: parsePassword(body.newPassword)
  };
};