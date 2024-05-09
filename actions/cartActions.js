const sql = require("better-sqlite3");
const db = sql("e-comerce.db");
const { updateAction, createAction, readAction } = require("../CRUD/actions");

function checkInsertCart({ user_id, item_id, qnt, price, name, creation_at }) {
  let ret;
  let ret2;
  const [product] = readAction("cart", "user_id=? AND bought=? AND item_id=?", [
    user_id,
    0,
    item_id,
  ]);

  if (product && product?.qnt != qnt) {
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
  return ret;
}

exports.checkInsertCart = checkInsertCart;
