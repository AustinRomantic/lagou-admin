const userModel = require('../models/user.js')

const tools = require('../utils/tools.js')

module.exports = {
    async signup(req, res, next) {
        res.header('Content-Type', 'application/json;charset=utf-8')
        let { username, password } = req.body;
        //  判断该用户是否注册过
        let result = await userModel.findone(username)
        if (!result) {
           // 密码加密
            let secretPass = await tools.funBcrypt(password);
            // 保存数据至数据库
            await userModel.save({
                username,
                password: secretPass
            });
            // res.send({
            //     status: 200,
            //     message: '新用户已创建成功',
            //     data: result
            // })
            // 返回前端
            
            // res.render('succ.ejs', {
            //     data: JSON.stringify({
            //         'msg': '用户注册成功'
            //     })
            // })
            res.json({
                msg: "用户已用户注册成功注册",
                status: 200,
                data: result
            })
            return
        }
        // res.render('succ.ejs', {
        //     data: JSON.stringify({
        //         msg: '用户已注册'
        //     })
        // })
        res.json({
            msg: "用户已注册",
            status: 200,
            data: {}
        })
    },
    // 登陆
    async signin(req, res, next) {
        res.header('Content-Type', 'application/json;charset=utf-8')
        let { username, password } = req.body;
        // 从数据库中根据用户名取出用户信息，方便做比对
        let result = await userModel.findone(username)
        if (result) {
            let resCompare = await tools.comparePassword(password, result.password);
            if (resCompare) { 
                // res.render('succ.ejs', {
                //     data: JSON.stringify({
                //         'msg': '用户登陆成功'
                //     })
                // })
                res.json({
                    msg: "用户登陆成功",
                    status: 200,
                    data: result
                })
            } else {
                // res.render('succ.ejs', {
                //     data: JSON.stringify({
                //         msg: '用户名或密码错误'
                //     })
                // })
                res.json({
                    msg: "用户名或密码错误",
                    status: 200,
                    data: {}
                })
            }
        } else {
            // res.render('succ.ejs', {
            //     data: JSON.stringify({
            //         msg: '暂无此用户信息'
            //     })
            // })
            res.json({
                msg: "暂无此用户信息",
                status: 200
            })
        }
    }
}