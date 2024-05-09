const { createAction, updateAction, readAction } = require("../CRUD/actions");
const { getCurrentDate } = require("../helpers/dateFunc");
const { buildMail } = require("../helpers/email");

function insertOrder(user_id, name, email) {
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
  const ret = createAction("orders", invoice);
  ret.changes > 0 ? buildMail(cart, name, invoice.total, email) : null;
  return ret;
}

exports.insertOrder = insertOrder;
