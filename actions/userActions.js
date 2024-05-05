const sql = require("better-sqlite3");
const db = sql("e-comerce.db");
const pkg = require("bcryptjs");
const { compare } = pkg;
const { createAction, readAction } = require("../CRUD/actions");

async function getUser(user) {
  const [userRet] = readAction("users", "email_address=?", [user.email]);
  if (user?.confUser) {
    return userRet;
  } else {
    if (!userRet) {
      user.message = "Could not find user";
      return user;
    } else {
      const isValid = await compare(user.password, userRet.password);
      if (isValid) {
        return userRet;
      } else {
        user.message = "Wrong Password";
        return user;
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
    createAction("users", user);
    return user;
  } else {
    user.message = "user already registered";
    return user;
  }
}

function getUserAdd(id) {
  const userRet = db.prepare("SELECT * FROM userAddress WHERE id = ?").get(id);
  return userRet;
}

exports.newUser = newUser;
exports.getUser = getUser;
exports.getUserAdd = getUserAdd;
