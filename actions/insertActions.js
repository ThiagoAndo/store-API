const sql = require("better-sqlite3");
const db = sql("e-comerce.db");
const { products } = require("../data/productsData");
// import { getCart } from "./cartActions.js";
// import getCurrentDate from "./utils/functions.js";
// import { getProductById, updateProductQnt } from "./productActions.js";
// import { updateCartPurchased } from "./cartActions.js";
// import { products } from "./productsData.js";

function insertUser(user) {
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

function insertUserAdd({ id, line_one, line_two, town_city, constry_state }) {
  db.prepare(
    `
    INSERT INTO userAddress
      (id, line_one, line_two,town_city, constry_state)
    VALUES (
      @id,
      @line_one,
      @line_two,
      @town_city,
      @constry_state,
    )
  `
  ).run({ id, line_one, line_two, town_city, constry_state });
}

function insertCart({ user_id, item_id, qnt, price, name, creation_at }) {
  db.prepare(
    `
    INSERT INTO cart
      ( user_id, item_id, qnt, bought, price,name, creation_at)
    VALUES (
      @user_id,
      @item_id,
      @qnt,
      @bought,
      @price,
      @name,
      @creation_at
    )
  `
  ).run({
    user_id,
    item_id,
    qnt,
    bought: 0,
    price,
    name,
    creation_at,
  });
}
exports.insertUser = insertUser;
exports.insertCart = insertCart;
exports.insertUserAdd=insertUserAdd
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

function insertProduct(products) {
  const stmt = db.prepare(`
      INSERT INTO products VALUES (
         @id,
         @title,
         @description,
         @price,
         @discountPercentage,
         @rating,
         @stock,
         @brand,
         @category,
         @thumbnail
      )
   `);

  const stmt2 = db.prepare(`
      INSERT INTO images VALUES (
         @itemId,
         @image
      )
   `);

  for (const product of products) {
    product.id = String(product.id);
    stmt.run(product);
    for (const img in product.images) {
      stmt2.run({
        itemId: product.id,
        image: Object.values(product.images)[img],
      });
    }
  }
}

// insertProduct(products);

//  db.prepare("DROP TABLE products").run();
