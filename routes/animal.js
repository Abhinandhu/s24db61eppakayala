var express = require('express');
var router = express.Router();
const animal_controller = require('../controllers/animal');

// A little function to check if we have an authorized user and continue on or
// redirect to login.
const secured = (req, res, next) => {
  if (req.user){
  return next();
  }
  res.redirect("/login");
  }

/* GET all animals */
router.get('/', animal_controller.animal_view_all_Page);

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('animal', { title: 'Search Results for Class Animal' });
// });
router.put('/', function(req, res) {
  if(req.body.checkboxsale)toUpdate.sale = true;
  else toUpdate.same = false;
  })

router.get('/', animal_controller.animal_update_put );

/* GET detail animal page */
router.get('/detail', animal_controller.animal_view_one_Page);

/* GET create costume page */
router.get('/create', animal_controller.animal_create_Page);

/* GET create update page */
router.get('/update', secured, animal_controller.animal_update_Page);

/* GET delete costume page */
router.get('/delete', animal_controller.animal_delete_Page);



module.exports = router;
