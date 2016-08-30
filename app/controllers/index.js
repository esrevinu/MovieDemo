var Movie = require('../models/movie');
//index page
exports.index= function(req,res){
    console.log('user in session:');
    console.log(req.session.user);

    Movie.fetch(function(error,movies){
        if(error) {
            console.log(error);
        }
        res.render('index',{
            title:'movie 首页',
            movies:movies
        });
    })
};