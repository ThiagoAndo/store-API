const sql = require("better-sqlite3");
const db = sql("e-comerce.db");
const { updateAction, createAction, readAction } = require("../CRUD/actions");

function getCart(query, queryVal) {
  const cart = db
    .prepare(`SELECT * FROM cart WHERE ${query[0]} = ? AND ${query[1]}  = ?`)
    .all(queryVal[0], queryVal[1]);
  return cart || [];
}

function checkInsertCart({ user_id, item_id, qnt, price, name, creation_at }) {
  let ret;
  let ret2;
  const [product] = readAction("cart", "user_id=? AND bought=? AND item_id=?", [
    user_id,
    0,
    item_id,
  ]);
  if (product) {
    ret = updateAction("cart", "qnt = ?", "item_id = ? AND user_id=? ", [
      qnt,
      item_id,
      user_id,
    ]);
  } else {
    ret2 = createAction("cart", {
      user_id,
      item_id,
      qnt,
      bought: 0,
      price,
      name,
      creation_at,
    });
  }
  console.log(ret);
  return ret;
}

function updateCart(query, queryVal) {
  const stmt = db.prepare(
    `UPDATE cart  SET  ${query[0]} = ? WHERE ${query[1]} = ?`
  );
  const ret = stmt.run(queryVal[0], queryVal[1]);
}

function deleteCart(id) {
  const stmt = db.prepare(
    "DELETE  FROM  cart WHERE user_id = ? AND bought = ?"
  );
  const ret = stmt.run(id, 0);
  console.log(ret);
}

exports.getCart = getCart;
exports.checkInsertCart = checkInsertCart;
exports.deleteCart = deleteCart;
