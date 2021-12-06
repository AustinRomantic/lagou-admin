const mongose = require('mongoose');
// lagou为连接的数据库的名字
mongose.connect('mongodb://localhost:27017/lagou')

module.exports = mongose;
