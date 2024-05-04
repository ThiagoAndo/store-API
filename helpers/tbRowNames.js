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

exports.collNames = collNames;
