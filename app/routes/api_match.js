var express             = require('express');
var router              = express.Router();
var match_controller    = require('../controllers/match_controller');

/* GET Newsletter Shops listing. */
router.get('/',match_controller.list);
router.get('/:id',match_controller.get);
router.get('/:id/:year/:round/:competition',match_controller.get);
router.get('/:id/:year/:round/:competition/:team',match_controller.get);

//router.get('/:id/:searchname',match_controller.get);
router.post('/',match_controller.create);
//router.put('/:id',match_controller.put);
//router.delete('/:id',match_controller.delete);

module.exports = router;