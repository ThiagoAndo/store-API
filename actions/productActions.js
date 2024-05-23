const sql = require("better-sqlite3");
const db = sql("e-comerce.db");
const { products } = require("../data/productsData");

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

exports.insertP = insertProduct;

/* insertProduct(products); //this function call will populate the products table with ./data/productsData.js */

//  db.prepare("DROP TABLE products").run();
