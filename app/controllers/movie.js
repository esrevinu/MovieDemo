var Movie = require('../models/movie');
var Comment = require('../models/comment');
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
    res.render('admin',{
        title:'后台录入页',
        movie:{
            title:'',
            director:'',
            country:'',
            year:'',
            poster:'',
            flash:'',
            summary:'',
            language:''
        }
    });
};

exports.update = function(req,res){
    var id = req.params.id;
    console.log(id);
    if(id){
        Movie.findById(id,function(err,movie){
            if(err){
                console.log(err);
            }
            res.render('admin',{
                title:'movie 后台更新页',
                movie:movie
            })
        })
    }
};

exports.save = function(req,res){
    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie;
    if(id !='undefined'){
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
        _movie = new Movie({
            director:movieObj.director,
            title:movieObj.title,
            language:movieObj.language,
            country:movieObj.country,
            summary:movieObj.summary,
            flash:movieObj.flash,
            poster:movieObj.poster,
            year:movieObj.year
        })
        _movie.save(function (error,movie) {
            if(error){
                console.log(error);
            }
            res.redirect('/movie/'+movie._id);
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