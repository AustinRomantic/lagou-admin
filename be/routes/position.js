var express = require('express');
var router = express.Router();

const Position = require('../controls/position');
const userControl = require('../controls/user');

router.post('/list', userControl.isSignIn, Position.list);

module.exports = router;


