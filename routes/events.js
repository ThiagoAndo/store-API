const express = require("express");

const { insertUserAdd } = require("../actions/insertActions");
const {
  createAction,
  deleteAction,
  readAction,
} = require("../actions/actions");

const {
  newUser,
  getUser,
  getUserAdd,
  add,
  replace,
  remove,
} = require("../actions/userActions");

const { getAllProducts } = require("../actions/productActions");
const {
  checkInsertCart,
  getCart,
  deleteCart,
} = require("../actions/cartActions");
const { getImages } = require("../actions/imageActions");
const {
  isValidText,
  isValidDate,
  isValidImageUrl,
} = require("../util/validation");

const router = express.Router();

//User Routes===================================================

router.get("/user/:email/:password", async (req, res) => {
  readAction("users", "email_address=?", [req.params.email]);

  // const user = await getUser({
  //   email: req.params.email,
  //   password: req.params.password,
  // });
  // res.json(user);
});

router.post("/user/new", async (req, res) => {
  const data = req.body;

  const ret = create("users", data);
  console.log(ret);
  res.status(201).json(ret);
});

//Products Routes===================================================
router.get("/products", async (req, res) => {
  const products = getAllProducts();
  const images = getImages();
  res.json({ products, images });
});

//User Address===================================================

router.get("/add/:id", (req, res) => {
  console.log(req.params.id);

  const add = getUserAdd(req.params.id);
  if (add) {
    res.json(add);
  } else {
    res.json({ message: "not registered" });
  }
});

router.post("/add/:id", (req, res) => {
  const add = getUserAdd(req.params.id);
  const id = req.params.id;
  console.log("add");
  console.log(add === undefined);

  if (add === undefined) {
    const ret = insertUserAdd({ id, ...req.body });
    res.status(201).json(ret);
  } else {
    res.status(500).json("Already registered");
  }
});

//Cart Routes===================================================
router.get("/cart/:id", async (req, res) => {
  const user_id = req.params.id;
  const items = getCart(["user_id", "bought"], [user_id, 0]);
  res.json({ items });
});

router.post("/cart", async (req, res) => {
  const { items, id: user_id } = req.body;
  if (items.length === 0) {
    deleteCart(user_id);
  } else {
    items.forEach((item) => {
      const {
        id: item_id,
        quantity: qnt,
        createAt: creation_at,
        price,
        name,
      } = item;
      checkInsertCart({ user_id, item_id, qnt, creation_at, name, price });
    });
  }

  res.json({ message: "Cart created successufuly" });
});

// router.post('/', async (req, res, next) => {

//   const data = req.body;

//   let errors = {};

//   if (!isValidText(data.title)) {
//     errors.title = 'Invalid title.';
//   }

//   if (!isValidText(data.description)) {
//     errors.description = 'Invalid description.';
//   }

//   if (!isValidDate(data.date)) {
//     errors.date = 'Invalid date.';
//   }

//   if (!isValidImageUrl(data.image)) {
//     errors.image = 'Invalid image.';
//   }

//   if (Object.keys(errors).length > 0) {
//     return res.status(422).json({
//       message: 'Adding the event failed due to validation errors.',
//       errors,
//     });
//   }

//   try {
//     await add(data);
//     res.status(201).json({ message: 'Event saved.', event: data });
//   } catch (error) {
//     next(error);
//   }
// });

// router.patch('/:id', async (req, res, next) => {
//   const data = req.body;

//   let errors = {};

//   if (!isValidText(data.title)) {
//     errors.title = 'Invalid title.';
//   }

//   if (!isValidText(data.description)) {
//     errors.description = 'Invalid description.';
//   }

//   if (!isValidDate(data.date)) {
//     errors.date = 'Invalid date.';
//   }

//   if (!isValidImageUrl(data.image)) {
//     errors.image = 'Invalid image.';
//   }

//   if (Object.keys(errors).length > 0) {
//     return res.status(422).json({
//       message: 'Updating the event failed due to validation errors.',
//       errors,
//     });
//   }

//   try {
//     await replace(req.params.id, data);
//     res.json({ message: 'Event updated.', event: data });
//   } catch (error) {
//     next(error);
//   }
// });

// router.delete('/:id', async (req, res, next) => {
//   try {
//     await remove(req.params.id);
//     res.json({ message: 'Event deleted.' });
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
