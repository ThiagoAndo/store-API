const fs = require("node:fs/promises");

const { v4: generateId } = require("uuid");

const { NotFoundError } = require("../util/errors");

async function readData() {
  // const data = await fs.readFile("events.json", "utf8");
  // return JSON.parse(data);
  const response = await fetch(
    "https://library-98cc7-default-rtdb.europe-west1.firebasedatabase.app/events.json"
  );

  if (!response.ok) {
    throw new Error("Could not fetch events data!");
  }

  const data = await response.json();

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
  const storedData = await readData();
  if (!storedData) {
    throw new NotFoundError("Could not find any events.");
  }
  return storedData.events;
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
