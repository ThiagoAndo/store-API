const sql = require("better-sqlite3");
const db = sql("e-comerce.db");
const pkg = require("bcryptjs");
const { insertUser } = require("./insertActions");


async function newUser(user) {
  const { id, email_address, first_name, last_name, password } = user;
 

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
