var express             = require('express');
var router              = express.Router();
var classificacio_controller    = require('../controllers/classificacio_controller');
var jwtmiddleware       = require('./jwtmiddleware');



jwtmiddleware(router);

/* GET Newsletter Shops listing. */
router.get('/',classificacio_controller.list);
router.get('/:id',classificacio_controller.get);
//router.get('/:id/:searchname',match_controller.get);
router.post('/',classificacio_controller.create);
router.put('/:id',classificacio_controller.put);
router.delete('/:id',classificacio_controller.delete);

module.exports = router;