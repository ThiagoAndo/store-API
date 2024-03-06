const sql = require("better-sqlite3");
const db = sql("e-comerce.db");


 function getImages() {
  const images = db.prepare("SELECT *  FROM  images").all();
  return images;
}

// export function deleteImage(id) {
//   const stmt = db.prepare("DELETE  FROM  images WHERE item_id = ?");
//   const ret = stmt.run(id);
//   console.log("images======================================");
//   console.log(ret);
// }


exports.getImages = getImages;