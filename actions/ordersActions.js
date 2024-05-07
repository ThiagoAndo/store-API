import sql from "better-sqlite3";
const db = sql("e-comerce.db");
import { insertOrder } from "./insertActions.js";

export function newOrder(id) {
  insertOrder({ user_id: id });
}

export function getOrders(id) {
  const orders = db
    .prepare("SELECT paid_at, total FROM orders WHERE user_id = ?")
    .all(id);

  return orders;
}

export function deleteOrders(id) {
  const stmt = db.prepare("DELETE  FROM  orders WHERE user_id = ?");
  const ret = stmt.run(id);
  console.log("orders======================================");
  console.log(ret);
}

// export function insertOrder({ id = null, user_id }) {
//   let currentDate = getCurrentDate();
//   const cart = getCart(user_id, 0);

//   let creation_at = cart[0].creation_at;

//   let totalLocal = cart.reduce((sum, cart) => {
//     let [price] = getProductById({
//       tableCol: "price",
//       productRows: cart.item_id,
//     });
//     return (sum += price.price * cart.qnt);
//   }, 0);

//   db.prepare(
//     `
//     INSERT INTO orders
//       (invoice_id,cart_id, user_id, paid_at, total)
//     VALUES (
//       null,
//       @cart_id,
//       @user_id,
//       @paid_at,
//       @total
//     )
//   `,
//   ).run({
//     id,
//     cart_id: creation_at,
//     user_id,
//     paid_at: currentDate,
//     total: totalLocal,
//   });

//   updateCartPurchased(creation_at);
//   updateProductQnt(cart);
// }

// insertProduct(products);

//  db.prepare("DROP TABLE products").run();
