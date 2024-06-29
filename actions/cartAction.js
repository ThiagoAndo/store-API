const {  deleteAction } = require("../CRUD/actions");

function rearranging(body) {
  const { item, id: user_id } = body;
  const { id: item_id, name, price, quantity, createAt: creation_at } = item;
  if(item_id, name )
  return {
    user_id,
    item_id,
    qnt: quantity,
    bought: 0,
    price,
    name,
    creation_at,
  };
}
function deleleteCart(option, cart) {
  let ret;
  switch (option) {
    case 0:
      ret = deleteAction("cart", "user_id=?", [cart]);
      break;
    case 1:
      ret = deleteAction("cart", "item_id = ? AND user_id=?", [
        cart.item_id,
        cart.user_id,
      ]);
      break;
    default:
      console.log("Something went wrong on switch delete cart");
  }
  return ret;
}
exports.rearranging = rearranging;
exports.deleleteCart = deleleteCart;
