const fs = require("node:fs/promises");
const { getUser,newUser } = require("./userActions");
const { v4: generateId } = require("uuid");

const { NotFoundError } = require("../util/errors");

async function readData() {
// newUser({
//   id:'qwerr',
//   email_address: "ando.norimar@gmail.com",
//   first_name: "Norimar",
//   last_name: "Ando",
//   password: '12345678'
// })
  const data = await getUser({
    email: "ando.norimar@gmail.com",
    password: "12345678",
  });



  return data;
}

async function writeData(items) {
  const response = await fetch(
    "https://library-98cc7-default-rtdb.europe-west1.firebasedatabase.app/events.json",
    {
      method: "PUT",
      body: JSON.stringify({
        events: items,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Sending cart events failed.");
  }
}

async function getAll() {
  console.log('chamo')
  const storedData = await readData();
  console.log(storedData)
  
  if (!storedData) {
    throw new NotFoundError("Could not find any events.");
  }
  return storedData;
}

async function get(id) {
  const storedData = await readData();
  if (!storedData.events || storedData.events.length === 0) {
    throw new NotFoundError("Could not find any events.");
  }

  const event = storedData.events.find((ev) => ev.id === id);
  if (!event) {
    throw new NotFoundError("Could not find event for id " + id);
  }

  return event;
}

async function add(data) {
  const storedData = await readData();
  if (!storedData) {
    await writeData([{ ...data, id: generateId() }]);
    return;
  }
  storedData.events.unshift({ ...data, id: generateId() });
  await writeData(storedData.events);
}

async function replace(id, data) {
  const storedData = await readData();
  if (!storedData.events || storedData.events.length === 0) {
    throw new NotFoundError("Could not find any events.");
  }

  const index = storedData.events.findIndex((ev) => ev.id === id);
  if (index < 0) {
    throw new NotFoundError("Could not find event for id " + id);
  }

  storedData.events[index] = { ...data, id };

  await writeData(storedData.events);
}

async function remove(id) {
  const storedData = await readData();

  const updatedData = storedData.events.filter((ev) => ev.id !== id);
  await writeData(updatedData);
}

exports.getAll = getAll;
exports.get = get;
exports.add = add;
exports.replace = replace;
exports.remove = remove;
