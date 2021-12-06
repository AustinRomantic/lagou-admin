import SMERouter from 'sme-router'

const router = new SMERouter('router-view','hash') 
const routerUser = new SMERouter('user-menu', 'hash')

import Home from '../controllers/home.js'; 
import Position from '../controllers/position.js';

import User from '../controllers/user.js';
// res.render('djq, 36k,fighting!')只能渲染简单的字符串
// router.route('/', (req, res, next) => {
//     const { params, query, body , url, route } = req

//     res.render('djq, 36k,fighting!');
// })

//sme-router中间件，先于路由跳转执行，可以理解为加了路由拦截
router.use((req, res, next) => {
//    $('.sidebar-menu li.nav').on('click', function() {
//        $(this).addClass('active').siblings().remove('active');
//    })
    // req.url   / /position
    $(`.sidebar-menu li.nav a[href="/#${req.url}"]`)
    .parent()
    .addClass('active')
    .siblings() // ?返回目标元素的所有同级元素
    .removeClass('active')
})


router.route('/', Home.render)
router.route('/position', Position.render)

// 将页面重定向
router.redirect('/')

routerUser.route('/', User.render)

export default router;