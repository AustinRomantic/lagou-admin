module.exports = {
    auth(req, res, next) {
        if (req.session.username) {
            next();
        } else {
            res.json({
                msg: "用户名未登陆",
                status: 200,
                data: {
                    login: false
                }
            })
       }
    }
}