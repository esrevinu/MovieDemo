var Movie = require('../models/movie');
var Comment = require('../models/comment');
var Category = require('../models/category');
var _ = require('underscore');

exports.detail = function(req,res){
    var id = req.params.id;

    Movie.findById(id,function(err,movie){
        Comment
            .find({movie: id})
            .populate('from','name')
            .populate('reply.from reply.to','name')
            .exec(function(err,comments){
                res.render('detail',{
                    title:'详情页',
                    movie:movie,
                    comments:comments
                });
            });
    })
};

exports.new = function(req,res){
    Category.find({},function(err,categories){
        res.render('admin',{
            title:'后台录入页',
            categories:categories,
            movie:{}
        });
    });
};

exports.update = function(req,res){
    var id = req.params.id;
    if(id){

        Movie.findById(id,function(err,movie){
            Category.find({},function(err,categories){
                if(err){
                    console.log(err);
                }
                res.render('admin',{
                    title:'movie 后台更新页',
                    movie:movie,
                    categories: categories
                })
            })

        })
    }
};

exports.save = function(req,res){
    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie;
    if(id){
        Movie.findById(id,function(err,movie){
            if(err){
                console.log(err);
            }
            _movie = _.extend(movie,movieObj);
            _movie.save(function (error,movie) {
                if(error){
                    console.log(error);
                }
                res.redirect('/movie/'+movie._id);
            })
        })
    }
    else {
        _movie = new Movie(movieObj);
        var categoryId = movieObj.category;
        var categoryName = movieObj.categoryName;
        _movie.save(function (error,movie) {
            if(error){
                console.log(error);
            }
            if(categoryId){
                Category.findById(categoryId,function(err,category){
                    category.movies.push(_movie._id);
                    category.save(function(err,category){
                        res.redirect('/movie/'+movie._id);
                    })
                })
            }else if(categoryName){
                var category = new Category({
                   name: categoryName,
                   movies: [movie._id]
                });
                category.save(function(err,category){
                    if(err)
                        console.log(err);
                    else{
                        movie.category = category._id;
                        movie.save(function(err,movie){
                            res.redirect('/movie/'+movie._id);
                        })
                     }
                })
            }

        })
    }
};
exports.list = function(req,res){

    Movie.fetch(function(error,movies){
        if(error) {
            console.log(error);
        }
        res.render('list',{
            title:'movie 列表页',
            movies:movies
        });
    });
};
exports.del = function(req,res){
    var id = req.query.id;
    if(id) {
        Movie.remove({_id:id},function(err,movie){
            if(err){
                console.log(err);
            }
            else {
                res.json({
                    success: 1
                })
            }
        })
    }
};