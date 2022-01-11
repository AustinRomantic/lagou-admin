const mongose = require('../utils/db.js');

const Position = mongose.model('position', {
    companyName: String,
    positionName: String,
    workPlace: String,
    money: String || Number,
    createTime: String,
    updateTime: String
})

module.exports = {
    save({ companyName, positionName, workPlace, money,createTime}) {
        const position = new Position({
            companyName,
            positionName,
            workPlace,
            money,
            createTime
        })
        return position.save()
    },
    findAll({ start, size }) { //start 代表从第几条开始查
        return Position.find({}).sort({_id: -1}).limit(~~size).skip(~~start)
    },
    getTotal() {
        return Position.count();
    },
    findById(id) {
        return Position.findById(id)
    },
    update({ companyName, positionName, workPlace, money, updateTime}) {
        return Position.updateOne({ companyName, positionName, workPlace, money,updateTime})
    },
    deleteOne(id) {
        return Position.deleteOne({_id: id})
    }
}