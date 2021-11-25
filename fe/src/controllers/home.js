import HomeView from '../views/home.art';

export default  {
    render(req, res, next) {
        // res.render('DJQ 36k, fighting!')
        res.render(HomeView(req))
    }
}