const sql = require("better-sqlite3");
const db = sql("e-comerce.db");
const { products } = require("../data/productsData");
// import { getCart } from "./cartActions.js";
// import getCurrentDate from "./utils/functions.js";
// import { getProductById, updateProductQnt } from "./productActions.js";
// import { updateCartPurchased } from "./cartActions.js";
// import { products } from "./productsData.js";

function insertUser(user) {
  // const currentDate = getCurrentDate();
  db.prepare(
    `
    INSERT INTO users
      (email_address, first_name, last_name,id, password, created_at)
    VALUES (
      @email_address,
      @first_name,
      @last_name,
      @id,
      @password,
      @created_at
    )
  `
  ).run(user);
}

exports.insertUser = insertUser;
// export function insertCard({ creation_at, user_id, item_id, qnt }) {
//   let currentDate = "";
//   if (!creation_at) {
//     currentDate = getCurrentDate();
//   } else {
//     currentDate = creation_at;
//   }
//   db.prepare(
//     `
//     INSERT INTO cart
//       ( user_id, item_id, qnt, bought, creation_at)
//     VALUES (
//       @user_id,
//       @item_id,
//       @qnt,
//       @bought,
//       @creation_at
//     )
//   `,
//   ).run({
//     user_id,
//     item_id,
//     qnt,
//     bought: 0,
//     creation_at: currentDate,
//   });
// }

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

// function insertProduct(products) {
//   const stmt = db.prepare(`
//       INSERT INTO products VALUES (
//          @id,
//          @title,
//          @description,
//          @price,
//          @discountPercentage,
//          @rating,
//          @stock,
//          @brand,
//          @category,
//          @thumbnail
//       )
//    `);

//   const stmt2 = db.prepare(`
//       INSERT INTO images VALUES (
//          @itemId,
//          @image
//       )
//    `);

//   for (const product of products) {
//     product.id = String(product.id);
//     stmt.run(product);
//     for (const img in product.images) {
//       stmt2.run({
//         itemId: product.id,
//         image: Object.values(product.images)[img],
//       });
//     }
//   }
// }

//  db.prepare("DROP TABLE products").run();
