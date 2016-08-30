var Category = require('../models/category');
var _ = require('underscore');

exports.new = function(req,res){
    res.render('category_admin',{
        title:'后台分类录入页',
        category:{}
    });
};

exports.save = function(req,res){
    var _category = req.body.category;
    var category = new Category(_category);

    category.save(function (error,category) {
        if(error){
            console.log(error);
        }
        res.redirect('/admin/category/list');
    })

};
exports.list = function(req,res){

    Category.fetch(function(error,categories){
        if(error) {
            console.log(error);
        }
        res.render('categorylist',{
            title:'电影分类列表页',
            categories: categories
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