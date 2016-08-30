var User = require('../models/user');

exports.showSignup = function(req,res){
    res.render('signup',{
        title:'注册页面'
    })
};

exports.showSignin = function(req,res){
    res.render('signin',{
        title:'登陆页面'
    })
};

exports.signup = function(req,res){
    var _user = req.body.user;
    User.findOne({name: _user.name},function(err,user){
        if(err)
            console.log(err);
        if(user){
            return res.redirect('/signin');
        }
        else{
            var user = new User(_user);
            user.save(function(err,user){
                if(err)
                    console.log(err);
                res.redirect('/');
            });
        }
    })

    // req.param('user')

    //req.params.userid >
    //req.body.userid >
    //req.query.userid

    // console.log(_user);
};

exports.signin = function(req,res){
    var _user = req.body.user;
    var name = _user.name;
    var password = _user.password;

    User.findOne({name:name},function(err,user){
        if(err){
            console.log(err);
        }
        if(!user){
            console.log('User not exist');
            return res.redirect('/signup');
        }
        user.comparePassword(password,function(err,isMatch){
            if(err){
                console.log(err);
            }
            if(isMatch){
                console.log('Password is matched');
                req.session.user = user;
                return res.redirect('/');
            }else{
                console.log('Password is not matched');
                return res.redirect('/signin');
            }
        });
    });
};
exports.logout = function(req,res){
    delete req.session.user;
    // delete app.locals.user;
    res.redirect('/');
};

exports.list = function(req,res){
    User.fetch(function(error,users){
        if(error) {
            console.log(error);
        }
        res.render('userlist',{
            title:'用户列表页',
            users:users
        });
    });
};

exports.signinRequired = function(req,res,next){
    var user = req.session.user;
    if(!user){
        return res.redirect('/signin');
    }
    next();
};

exports.adminRequired = function(req,res,next){
    var user = req.session.user;
    if(user.role <= 10){
        return res.redirect('/signin');
    }
    next();
};