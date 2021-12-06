var express = require('express');
var router = express.Router();


const Users =  require('../controls/user') ;

/* GET users listing. */
router.post('/signup', Users.signup);

router.post('/signin', Users.signin);

module.exports = router;
