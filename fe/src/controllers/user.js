import UserView from '../views/user.art';


let _url = ''; // 定义登陆注册接口
let _type = ''; //定义按钮类型
let _isSignIn = false; // 用户登陆鉴权

function bindEventToBtn() {
    // 确认
    $('#btn-signsubmit').on('click', function () {
        let data = $('#userform').serialize()
        $.ajax({
            url: _url,
            type: 'POST',
            data,
            dataType:"json",
            success: function ({status, msg, data}) {
                // result.
                // let res = typeof JSON.parse(JSON.stringify(result))
                if (status === 200 && data.username ) {
                    alert(`${_url === '/api/users/signin' ? '登陆成功' : '注册成功'} `)
                    let html = UserView({
                        isSignin: true,
                        userInfo: data
                    });
                    $('.user-menu').html(html);
                } else {
                    alert(msg)
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                // 状态码
                console.log(XMLHttpRequest.status);
                // 状态
                console.log(XMLHttpRequest.readyState);
                // 错误信息   
                console.log(textStatus);
            },
        })
    })
    // 登陆 & 注册
    $('.sign-btn').on('click', function() {
        _url = $(this).attr('id') === 'btn-signin' ? '/api/users/signin' : '/api/users/signup';
        $('input').val('');
    })
    // 退出
    $('#btn-signout').on('click', function () {
        $.ajax({
            url: '/api/users/signout',
            methods: 'GET',
            success(res) {
                alert(res.msg)
                window.location.reload();
            }
        }) 
    })
}
function isSigninFunc() {
    return $.ajax({
        url: '/api/users/isSignIn',
        methods: 'GET',
        success(res) {
            return res;
        }
    }) 
}

export default {
    async render() {
        // $('.user-menu').html(UserView()); //无法动态传参
        const res = await isSigninFunc();
        let html = UserView({
            isSignin: res.data.login,
            userInfo: res.data
        });
        $('.user-menu').html(html);
        bindEventToBtn();
    },
    
}

