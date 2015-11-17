var express = require('express');
var router = express.Router();
var auth_controller = require('../controllers/auth_controller');
var jwtmiddleware       = require('./jwtmiddleware');

jwtmiddleware(router);

/* GET users listing. */

router.get('/',auth_controller.list);
router.post('/',auth_controller.create);

module.exports = router;
