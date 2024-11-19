const Tour=require('../model/Tour');

class searchTourController{
    async Search(req, res){
        try{
            const{name, level, slug}= req.query;
            const query={};
            if (name) query.name={ $regex: name, $option :'i'};
            if (level) query.level=level;
            if (slug) query.timestamp= slug;

            const SearchTour= await Tour.find(query);
            res.render('SearchTour',{SeachTour});
        }catch(err){
            console.error(err);
            res.status(500).json({ message: "Seem to be nothing like you want", error: err });
        }
        
    }
}
module.exports = new searchTourController();
