var express             = require('express');
var router              = express.Router();
var home_controller    = require('../controllers/home_controller');

/* GET users listing. */
router.get('/',home_controller.list);

module.exports = router;
