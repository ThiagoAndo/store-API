const sql = require("better-sqlite3");
const db = sql("e-comerce.db");
const pkg = require("bcryptjs");
const { hash, compare } = pkg;
const uniqid = require("uniqid");
const { insertUser } = require("./insertActions");

// // import { deleteProduct } from "./productActions.js";
// // import { deleteCart } from "./cartActions.js";
// // import getCurrentDate from "./utils/functions.js";
// import { insertUser } from "./insertActions.js";
// // import { deleteOrders } from "./ordersActions.js";
// // import {
//   // isEmailValid,
//   // isNameValid,
//   // isPasswordValid,
// // } from "./utils/functions.js";

async function newUser(user) {
  const { id, email_address, first_name, last_name, password } = user;
  // let msn = "";
  // if (!isEmailValid(email_address)) {
  //   return { message: "Email is not valid!" };
  // } else if (!isNameValid(first_name + " " + last_name)) {
  //   return { message: "Name is not valid!" };
  // } else if (!isPasswordValid(password)) {
  //   return { message: "Password is too short!" };
  // }

  // user.id = uniqid();
  // user.password = await hash(user.password, 12);

  const conf = await getUser(user.email_address);
  if (conf.message) {
    insertUser(user);
    console.log("user registered successfully");
    return { message: "user registered successfully" };
  } else {
    console.log("user already registered");

    return { message: "user already registered" };
  }
}

async function getUser({ email, password }) {
  const user = db
    .prepare("SELECT * FROM users WHERE email_address = ?")
    .get(email);
  if (!user) {
    return { message: "Could not find user" };
  } else {
    const isValid = await compare(password, user.password);
    if (isValid) {
      return user;
    } else {
      return { message: "Wrong Password" };
    }
  }
}
exports.newUser = newUser;
exports.getUser = getUser;
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
