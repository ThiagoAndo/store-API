const sql = require("better-sqlite3");
const db = sql("e-comerce.db");
const pkg = require("bcryptjs");
const { compare, hash} = pkg;
const { createAction, deleteAction, readAction } = require("../CRUD/actions");

async function getUser(user) {
  const userRet = readAction("users", "email_address=?", [user.email]);
  console.log(user.password);
  if (user?.confUser) {
    return userRet;
  } else {
    if (!userRet) {
      user.message = "Could not find user";
      return user;
    } else {
      const isValid = await compare(user.password, userRet.password);
      if (true) {
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
    user.password = hash(user.password)
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

function deleteUser() {}

exports.newUser = newUser;
exports.getUser = getUser;
exports.getUserAdd = getUserAdd;
// export function deleteUser(email, id) {
//   deleteOrders(id);
//   deleteCart(id);
//   deleteProduct(id);

//   const stmt = db.prepare("DELETE  FROM users WHERE email_address = ?");
//   const ret = stmt.run(email);
//   console.log("deleteUser======================================");

//   console.log(ret);
// }

// export function updateUserData({ newEmail, first, last, email }) {
//   let stmt = db.prepare(
//     `UPDATE users  SET email_address=?,first_name=?, last_name=? WHERE email_address  = ?`,
//   );
//   const ret = stmt.run(newEmail, first, last, email);
//   console.log(ret);
// }

// export async function changePassword(newPassword, email) {
//   const password = await hash(newPassword, 12);

//   let stmt = db.prepare(
//     `UPDATE users  SET password =? WHERE email_address  = ?`,
//   );
//   const ret = stmt.run(password, email);
//   console.log(ret);
// }
