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

function deleteData(table) {
  db.prepare(`DELETE  FROM ${table}`).run();
}

function restoreProductTable() {
  setTimeout(() => {
    deleteData("images");
    deleteData("products");
    insertProduct(products);
  }, 8000);
}

/* insertProduct(products); //this function call will populate the products table with ./data/productsData.js */

exports.insertP = insertProduct;
exports.restore = restoreProductTable;
