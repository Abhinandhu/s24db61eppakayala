var express = require('express');
var router = express.Router();
const animal_controller = require('../controllers/animal');

/* GET all animals */
router.get('/', animal_controller.animal_list);

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('animal', { title: 'Search Results for Class Animal' });
// });

module.exports = router;
