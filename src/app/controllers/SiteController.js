class SiteController {
    index(req, res){
        res.json({
            name: 'test'
        })
    }
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

