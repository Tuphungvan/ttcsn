const Tour=require('../models/Tour');

class TourController{
    async search(req, res){
        try{
            const{name, level, slug}= req.query;
            const query={};
            if (name) query.name={ $regex: name, $options :'i'};
            if (level) query.level=level;
            if (slug) query.timestamp= slug;

            const searchTour= await Tour.find(query);
            res.render('search',{searchTour});// Tên giao diện trong views
        }catch(err){
            console.error(err);
            res.status(500).json({ message: "Seem to be nothing like you want", error: err });
        }
        
    }
}
module.exports = new TourController();
