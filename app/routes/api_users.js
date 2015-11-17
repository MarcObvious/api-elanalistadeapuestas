var express             = require('express');
var router              = express.Router();
var users_controller    = require('../controllers/users_controller');
var jwtmiddleware       = require('./jwtmiddleware');



jwtmiddleware(router);

/* GET users listing. */
router.get('/',users_controller.list);
router.get('/:id',users_controller.get);
router.post('/',users_controller.create);
router.put('/:id',users_controller.put);
router.delete('/:id',users_controller.delete);

module.exports = router;
