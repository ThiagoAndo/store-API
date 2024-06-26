const { createAction, updateAction, readAction } = require("../CRUD/actions");
const { getCurrentDate } = require("../helpers/dateFunc");
const { buildMail } = require("../helpers/email");
function insertOrder(user_id, name, email, cart) {
  let thisCart;
  let ret = {};
  if (cart) {
    thisCart = cart;
  } else {
    thisCart = readAction("cart", "user_id=? AND bought=?", [user_id, 0]);
  }
  const total = thisCart.reduce((sum, cart) => {
    return (sum += +cart.price * (+cart?.qnt || +cart?.quantity));
  }, 0);
  const invoice = {
    invoice_id: null,
    cart_id: thisCart[0].creation_at || null,
    user_id,
    paid_at: getCurrentDate(),
    total,
  };
  if (cart) {
    buildMail(thisCart, name, total, email);
    ret.changes = 1;
    return ret;
  } else {
    updateAction("cart", "bought = ?", "user_id=? ", [1, user_id]);
    const ret = createAction("orders", invoice);
    ret.changes > 0 ? buildMail(thisCart, name, total, email) : null;
    return ret;
  }
}
exports.insertOrder = insertOrder;
