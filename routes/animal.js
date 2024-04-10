var express = require('express');
var router = express.Router();
const animal_controller = require('../controllers/animal');

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

module.exports = router;
