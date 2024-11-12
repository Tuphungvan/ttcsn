class NewsController {
    // get trang
    index(req, res){
        res.render('news');
    }
    // get slug
    show(req,res){
        res.send("....")
    }
}

module.exports = new NewsController;

