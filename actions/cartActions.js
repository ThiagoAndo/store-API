const sql = require("better-sqlite3");
const db = sql("e-comerce.db");
const { insertCart } = require("./insertActions");

function getCart(id, bought, creation_at) {
  const col = creation_at || "*";
  const cart = db
    .prepare(`SELECT ${col}  FROM cart WHERE user_id = ? AND bought = ?`)
    .all(id, bought);
  if (!cart) {
    return { message: "No cart found" };
  } else {
    return cart;
  }
}

function updateCart({ user_id, item_id, qnt, creation_at }) {
  insertCart({
    user_id,
    item_id,
    qnt,
    creation_at,
  });
}

function updateCartPurchased(creation_at) {
  const stmt = db.prepare("UPDATE cart  SET  bought = ? WHERE creation_at = ?");
  const ret = stmt.run(1, creation_at);
}

function deleteCart(id) {
  const stmt = db.prepare("DELETE  FROM  cart WHERE user_id = ?");
  const ret = stmt.run(id);
  console.log(ret);
}

exports.updateCart = updateCart;
