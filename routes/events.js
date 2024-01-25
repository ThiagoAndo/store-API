const express = require('express');

const { newUser, getUser, add, replace, remove } = require("../data/event");
const {
  isValidText,
  isValidDate,
  isValidImageUrl,
} = require("../util/validation");

const router = express.Router();



router.get("/user/:email/:password", async (req, res) => {

  
    const event = await getUser({email:req.params.email,password: req.params.password});
    if(Object.keys(event).length > 0){
      res.json({ user: event });

    }else{
      res.json({ event });

    }
});

router.post('/user/new', async (req, res) => {

  const data = req.body;
  const event = await newUser(data);
  console.log(event );
  if(Object.keys(event).length > 0){
    res.json({ user: event });

  }else{
    res.json({ event });

  }


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
