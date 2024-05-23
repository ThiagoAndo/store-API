const sql = require("better-sqlite3");
const db = sql("e-comerce.db");
const pkg = require("bcryptjs");
const { hash, compare } = pkg;
const uniqid = require("uniqid");
const { currentDate } = require("../helpers/dateGenerator");
const { createJSONToken } = require("../util/auth");

const { isName, isPassword, isEmail } = require("../helpers/validate");

require("../helpers/routeLock");
const { createAction, readAction } = require("../CRUD/actions");
let error = {};

const changeAccess = (isSIgnIn) => {
  allowAccess = true;
  setTimeout(() => {
    allowAccess = false;
  }, 5400000);
};

async function getUser(user) {
  const [userRet] = readAction("users", "email_address=?", [user.email]);
  if (user?.confUser) {
    return userRet;
  } else {
    if (!userRet) {
      error.message = "Could not find user";
      return error;
    } else {
      const isValid = await compare(user.password, userRet.password);
      if (isValid) {
        const authToken = createJSONToken(user.email_address);
        userRet.token = authToken;
        return userRet;
      } else {
        error.message = "Wrong Password";
        return error;
      }
    }
  }
}

async function newUser(user) {
  const conf = await getUser({
    email: user.email_address,
    password: user.password,
    confUser: "yes",
  });
  if (!conf) {
    if (!isName(user.first_name + " " + user.last_name)) {
      error.message =
        "Name is wrong. Make sure to enter first and last name only";
      return error;
    } else if (!isEmail(user.email_address)) {
      return (error.message = "Email is not valid ");
    } else if (!isPassword(user.password)) {
      return (error.message = "Password must contain at least eight character");
    }

    user.password = await hash(user.password, 12);
    user.id = uniqid();
    user.created_at = currentDate();
    changeAccess();
    createAction("users", user);
    const authToken = createJSONToken(user.email_address);
    user.token = authToken;
    return user;
  } else {
    return (error.message = "user already registered");
  }
}

exports.newUser = newUser;
exports.getUser = getUser;
