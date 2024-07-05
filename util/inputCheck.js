const { readAction } = require("../CRUD/actions");

function isValid(id, uId) {
  const product = readAction("products", "id=?", [id]);
  const user = readAction("users", "id=?", [uId]);
  if (id && uId) return product.length > 0 && user.length > 0;
  if (id === null && uId) return user.length > 0;
}

exports.isValid = isValid;
