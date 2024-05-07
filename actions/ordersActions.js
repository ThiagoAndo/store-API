const sql = require("better-sqlite3");
const db = sql("e-comerce.db");
const { createAction, updateAction, readAction } = require("../CRUD/actions");

function insertOrder( user_id ="12345") {

  const cart = readAction("cart", "user_id=? AND bought=?", [user_id, 0]);

  // let creation_at = cart[0].creation_at;

  // let totalLocal = cart.reduce((sum, cart) => {
  //   let [price] = getProductById({
  //     tableCol: "price",
  //     productRows: cart.item_id,
  //   });
  //   return (sum += price.price * cart.qnt);
  // }, 0);

  // db.prepare(
  //   `
  //   INSERT INTO orders
  //     (invoice_id,cart_id, user_id, paid_at, total)
  //   VALUES (
  //     null,
  //     @cart_id,
  //     @user_id,
  //     @paid_at,
  //     @total
  //   )
  // `
  // ).run({
  //   id,
  //   cart_id: creation_at,
  //   user_id,
  //   paid_at: currentDate,
  //   total: totalLocal,
  // });

  // updateCartPurchased(creation_at);
  return cart
}

console.log(insertOrder());