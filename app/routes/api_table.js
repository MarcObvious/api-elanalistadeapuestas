var express             = require('express');
var router              = express.Router();
var table_controller    = require('../controllers/table_controller');
var jwtmiddleware       = require('./jwtmiddleware');



jwtmiddleware(router);

/* GET Newsletter Shops listing. */
router.get('/',table_controller.list);
router.get('/:id',table_controller.get);
//router.get('/:id/:searchname',match_controller.get);
router.post('/',table_controller.create);
router.put('/:id',table_controller.put);
router.delete('/:id',table_controller.delete);

module.exports = router;