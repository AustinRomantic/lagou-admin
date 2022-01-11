var express = require('express');
var router = express.Router();

const Position = require('../controls/position');
// const userControl = require('../controls/user');
const authMiddleWare = require('../middlewares/auth');

router.post('/list', authMiddleWare.auth, Position.list);
router.post('/add', authMiddleWare.auth, Position.add);
router.patch('/edit', authMiddleWare.auth, Position.edit);
router.delete('/deleteOne', authMiddleWare.auth, Position.deleteOne);
router.post('/getInfoById', authMiddleWare.auth, Position.findOneById);


module.exports = router;


