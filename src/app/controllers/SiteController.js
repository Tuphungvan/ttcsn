class SiteController {
    // get trang
    index(req, res){
        res.render('home');
    }
    // get slug
    search(req,res){
        res.render('search');
    }
}

module.exports = new SiteController;

