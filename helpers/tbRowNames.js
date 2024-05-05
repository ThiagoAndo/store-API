const collNames = {
  users: [
    "email_address",
    "first_name",
    "last_name",
    "id",
    "password",
    "created_at",
  ],
  userAddress: ["id", "line_one", "line_two", "town_city", "constry_state"],
  cart: ["user_id", "item_id", "qnt", "price", "name", "creation_at"],
};

function prepareNames(table) {
  return {
    coll: collNames[table].join(", "),
    insert: collNames[table].map((coll) => "@" + coll).join(", "),
  };
}


exports.collNames = collNames;
exports.prepareNames = prepareNames;
