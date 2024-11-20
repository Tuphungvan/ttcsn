class NewsController {
    // get trang
    index(req, res){
        res.render('users/news');
    }
    // get slug
    show(req,res){
        res.send("....")
    }
}

module.exports = new NewsController;

