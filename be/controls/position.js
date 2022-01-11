const positionModel = require('../models/position.js')
const moment = require('moment');
const { deleteOne } = require('../models/position.js');

module.exports = {
    async list(req, res, next) {
        let queryBody = req.body;
        let result = await positionModel.findAll(queryBody);
        res.json({
            status: 200,
            msg: 'success',
            data: {
                list: result,
                total: await positionModel.getTotal(),
                pageCount: Math.ceil(await positionModel.getTotal()/ queryBody.size)
            },
        })  
    },
    async findOneById(req, res, next) {
        let result = await positionModel.findById(req.body.id);
        res.json({
            status: 200,
            msg: 'success',
            data: result
        })
    },
    async add(req, res, next) {
        let result = await positionModel.save({
            ...req.body,
            createTime: moment().format('YYYY-MM-DD hh:mm:ss')
        });
        res.json({
            status: 200,
            msg: 'success'
        })
    },
    async edit(req, res, next) {
        let result = await positionModel.update({
            ...req.body,
            updateTime: moment().format('YYYY-MM-DD hh:mm:ss')
        });
        res.json({
            status: 200,
            msg: 'success'
        })
    },
    async deleteOne(req, res, next) {
        let result = await positionModel.deleteOne(req.body.id);
        res.json({
            status: 200,
            msg: 'success'
        })
    }

}