var express             = require('express');
var router              = express.Router();
var matchextra_controller    = require('../controllers/matchextra_controller');

/* GET Matchs extra. */
router.get('/',matchextra_controller.list);
router.get('/:id',matchextra_controller.get);
//router.get('/:id/:searchname',match_controller.get);
//router.post('/',matchextra_controller.create);
//router.put('/:id',matchextra_controller.put);
//router.delete('/:id',matchextra_controller.delete);

module.exports = router;