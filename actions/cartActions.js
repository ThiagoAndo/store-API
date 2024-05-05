const sql = require("better-sqlite3");
const db = sql("e-comerce.db");
const { updateAction } = require("../CRUD/actions");

function getCart(query, queryVal) {
  const cart = db
    .prepare(`SELECT * FROM cart WHERE ${query[0]} = ? AND ${query[1]}  = ?`)
    .all(queryVal[0], queryVal[1]);
  return cart || [];
}

function checkInsertCart({ user_id, item_id, qnt, price, name, creation_at }) {
  const [product] = getCart(["item_id", "bought"], [item_id, 0]);
  if (product) {
    updateAction("cart", "qnt = ?", "item_id = ?", [qnt, item_id]);
  } else {
    insertCart({
      user_id,
      item_id,
      qnt,
      price,
      name,
      creation_at,
    });
  }
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
