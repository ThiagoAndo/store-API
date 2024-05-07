const { createAction, updateAction, readAction } = require("../CRUD/actions");

function insertOrder(user_id) {
  const cart = readAction("cart", "user_id=? AND bought=?", [user_id, 0]);

  let creation_at = cart[0].creation_at;

  let totalLocal = cart.reduce((sum, cart) => {
    return (sum += cart.price * cart.qnt);
  }, 0);

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
  return totalLocal;
}

exports.insertOrder = insertOrder;
