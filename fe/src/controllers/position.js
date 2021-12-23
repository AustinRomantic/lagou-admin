import PositionView from '../views/position.art';

function getList() {
    return $.ajax({
        url: '/api/positions/list',
        method: 'POST',
        success(res) {
            console.log(res, 66666)
        }
   }) 
}
export default {
    async render(req, res, next) {
        const result = await getList();
        if (result.data.login === false) {
            window.location.href = '/'
        } else {
            res.render(PositionView({
                list: result.data
            }));
        }
       
    }
}