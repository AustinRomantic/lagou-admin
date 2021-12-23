module.exports = {
    async list(req, res, next) {
        res.json({
            status: 200,
            msg: '',
            data: [{
                task: '前端开发工程师'
            }, {
                task: '后端开发工程师（Nodejs）'
            }, {
                task: '前端开发工程师（Php）'
            }]
        })
    }
}