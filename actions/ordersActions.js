import sql from "better-sqlite3";
const db = sql("e-comerce.db");
import { insertOrder } from "./insertActions.js";

export function newOrder(id) {
  insertOrder({ user_id: id });
}

export function getOrders(id) {
  const orders = db
    .prepare("SELECT paid_at, total FROM orders WHERE user_id = ?")
    .all(id);

  return orders;
}

export function deleteOrders(id) {
  const stmt = db.prepare("DELETE  FROM  orders WHERE user_id = ?");
  const ret = stmt.run(id);
  console.log("orders======================================");
  console.log(ret);
}
