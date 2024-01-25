const fs = require("node:fs/promises");
const { v4: generateId } = require("uuid");
const sql = require("better-sqlite3");
const db = sql("e-comerce.db");
const pkg = require("bcryptjs");
const { hash, compare } = pkg;
const uniqid = require("uniqid");
const { insertUser } = require("./insertActions");

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

async function newUser(user) {
  const conf = await getUser({
    email: user.email_address,
    password: user.password,
  });
  if (Object.keys(conf).length > 0) {
    return { message: "user already registered" };
  } else {
    insertUser(user);
    return user;
  }
}

// async function writeData(items) {
//   const response = await fetch(
//     "https://library-98cc7-default-rtdb.europe-west1.firebasedatabase.app/events.json",
//     {
//       method: "PUT",
//       body: JSON.stringify({
//         events: items,
//       }),
//     }
//   );

//   if (!response.ok) {
//     throw new Error("Sending cart events failed.");
//   }
// }

// async function getAll() {
//   const storedData = await readData();

//   if (!storedData) {
//     throw new NotFoundError("Could not find any events.");
//   }
//   return storedData;
// }

// async function add(data) {
//   const storedData = await readData();
//   if (!storedData) {
//     await writeData([{ ...data, id: generateId() }]);
//     return;
//   }
//   storedData.events.unshift({ ...data, id: generateId() });
//   await writeData(storedData.events);
// }

// async function replace(id, data) {
//   const storedData = await readData();
//   if (!storedData.events || storedData.events.length === 0) {
//     throw new NotFoundError("Could not find any events.");
//   }

//   const index = storedData.events.findIndex((ev) => ev.id === id);
//   if (index < 0) {
//     throw new NotFoundError("Could not find event for id " + id);
//   }

//   storedData.events[index] = { ...data, id };

//   await writeData(storedData.events);
// }

// async function remove(id) {
//   const storedData = await readData();

//   const updatedData = storedData.events.filter((ev) => ev.id !== id);
//   await writeData(updatedData);
// }

// exports.getAll = getAll;
exports.getUser = getUser;
exports.newUser = newUser;
// exports.replace = replace;
// exports.remove = remove;
