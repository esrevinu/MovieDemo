var Movie = require('../models/movie');
var Category = require('../models/category');
//index page
exports.index= function(req,res){
    console.log("FIRST");
    Category
        .find({})
        .populate({path:'movies',options:{limit:5}})
        .exec(function(err,categories){
            if(err) {
                console.log(err);
            }
            console.log("categories:");
            console.log(categories);
            res.render('index',{
                title:'movie 首页',
                categories:categories
            });
        })
};