const sql = require("better-sqlite3");
const db = sql("e-comerce.db");
const { prepareNames } = require("../helpers/tbRowNames");

function readAction(table, params, valls) {
  const stmt = db.prepare(`SELECT *  FROM  ${table} WHERE ${params} `);
  const ret = stmt.get(...valls);
  return ret;
}

function createAction(table, data) {
  const colls = prepareNames(table);
  const ret = db
    .prepare(
      `
    INSERT INTO ${table} (
        ${colls.coll}
    )
    VALUES (
       ${colls.insert}
    )
  `
    )
    .run(data);

  return ret;
}

function deleteAction(table, colls, valls) {
  const stmt = db.prepare(`DELETE  FROM  ${table} WHERE ${colls} `);
  const ret = stmt.run(valls);
  return ret;
}

function updateAction(table, set, surch, valls) {
  const stmt = db.prepare(`UPDATE  ${table}  SET ${set} WHERE ${surch} `);
  const ret = stmt.run(valls);
  return ret;
}
exports.deleteAction = deleteAction;
exports.createAction = createAction;
exports.updateAction = updateAction;
exports.readAction = readAction;

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
