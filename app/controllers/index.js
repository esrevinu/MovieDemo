var Movie = require('../models/movie');
var Category = require('../models/category');
//index page
exports.index= function(req,res){
    console.log("FIRST");
    Category
        .find({})
        .populate({
            path:'movies',
            options:{limit:5}
        })
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

// search page
exports.search = function(req,res) {
    var catId = req.query.cat;
    var q = req.query.q;
    var page = parseInt(req.query.p,10) || 0;
    var pageSize = 2;
    var index = page * pageSize;
    if(catId){
        Category
            .find({_id: catId})
            .populate({
                path:'movies',
                select: 'title poster'
            })
            .exec(function(err,categories){
                if(err) {
                    console.log(err);
                }
                var category = categories[0] || {};
                console.log(category);
                var movies = category.movies || [];
                console.log('+++++++++++++++'+movies.length);
                var results = movies.slice(index,index+pageSize);

                console.log('**********'+pageSize);
                res.render('results',{
                    title:'电影结果列表页面',
                    keyword:category.name,
                    currentPage: (page + 1),
                    query: 'cat='+catId,
                    totalPage: Math.ceil(movies.length/pageSize),
                    movies:results
                });
            })
    }
    else {
        Movie.find({title:new RegExp(q+'.*')})
            .exec(function(err,movies){
                if(err){
                    console.log(err);
                }
                var results = movies.slice(index,index+pageSize);
                res.render('results',{
                   title:'电影结果列表页面',
                    keyword: q,
                    currentPage: (page + 1),
                    query: 'q='+q,
                    totalPage: Math.ceil(movies.length/pageSize),
                    movies:results
                });
            })
    }



}