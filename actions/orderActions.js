const { createAction, updateAction, readAction } = require("../CRUD/actions");
const { getCurrentDate } = require("../helpers/dateFunc");

function insertOrder(user_id) {
  const cart = readAction("cart", "user_id=? AND bought=?", [user_id, 0]);

  const invoice = {
    invoice_id: null,
    cart_id: cart[0].creation_at,
    user_id,
    paid_at: getCurrentDate(),
    total: cart.reduce((sum, cart) => {
      return (sum += cart.price * cart.qnt);
    }, 0),
  };

  updateAction("cart", "bought = ?", "user_id=? ", [1, user_id]);
  return createAction("orders", invoice);

}

exports.insertOrder = insertOrder;
