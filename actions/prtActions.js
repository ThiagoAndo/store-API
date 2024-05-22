const { v4: generateId } = require("uuid");
const sql = require("better-sqlite3");
const db = sql("e-comerce.db");

function getAllProducts() {
  const products = db.prepare(`SELECT * FROM products`).all();
  return products;
}

exports.getAllProducts = getAllProducts;

// export function getProductById({ tableCol, productRows }) {
//   let cols = tableCol || "*h";
//   const products = db
//     .prepare(`SELECT ${cols}  FROM products WHERE id= ?`)
//     .all(productRows);
//   if (!products) {
//     return { message: "No products found" };
//   } else {
//     return products;
//   }
// }

// export function updateProductQnt(carts) {
//   carts.map((cart) => {
//     let stmt = db.prepare(
//       `UPDATE products  SET stock =((SELECT stock FROM products WHERE id =?)-?)  WHERE id  = ?`
//     );
//     let ret = stmt.run(cart.item_id, cart.qnt, cart.item_id);
//   });
// }

// export function getCategories() {
//   const categories = db
//     .prepare(
//       `SELECT category, COUNT(DISTINCT category) AS qnt FROM products GROUP BY category`
//     )
//     .all();

//   return categories;
// }

// export function deleteProduct(id) {
//   deleteImage(id);
//   const stmt = db.prepare("DELETE  FROM  products WHERE id = ?");
//   const ret = stmt.run(id);
//   console.log("product======================================");
//   console.log(ret);
// }

// export function newProduct(newProduct) {
//   insertProduct(newProduct);
// }
