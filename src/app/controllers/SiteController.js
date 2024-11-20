class SiteController {
    index(req, res){
        res.json({
            name: 'test'
        })
    }
    // get trang
    index(req, res){
        res.render('users/home');
    }
    // get slug
    search(req,res){
        res.render('users/search');
    }
}

module.exports = new SiteController;

