const sql = require("better-sqlite3");
const db = sql("e-comerce.db");
const { insertCart } = require("./insertActions");

function getCart(query, queryVal) {
  const cart = db
    .prepare(`SELECT * FROM cart WHERE ${query[0]} = ? AND ${query[1]}  = ?`)
    .all(queryVal[0], queryVal[1]);
  return cart || [];
}

//console.log(getCart(["user_id", "bought"], [`lutuv3zy`, 0]));


function checkInsertCart({ user_id, item_id, qnt, price, name, creation_at }) {
  const [product] = getCart(["item_id", "bought"], [item_id, 0]);
  if (product) {
    updateCart(["qnt", "item_id"], [qnt, item_id]);
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
// console.log(getCart(["user_id", "bought"], ["d1s72lklucsilib", 0]));

// checkInsertCart(  {
//     user_id: 'd1s72lklucsilib',
//     item_id: '1',
//     qnt: 24,
//     bought: 0,
//     price: 477.8496,
//     name: 'iPhone 9',
//     creation_at: '29-03-2024   15:51:24'
//   });

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

// console.log(deleteCart("d1s72lklucsilib"));
exports.getCart = getCart;
exports.checkInsertCart = checkInsertCart;
exports.deleteCart = deleteCart;
