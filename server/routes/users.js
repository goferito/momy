var User = require('../model/user').model;

exports.showDashboard = function  (req,res) {
    res.locals.menu = 'dashboard';
    res.render('dashboard');
};

exports.loginForm = function(req, res){
    res.render('login');
};

exports.authenticate = function(req, res){
    User.findOne({username: req.body.user}, function(err, data){
        if(!err && data && req.body.pass == data.password){
            console.log(req.body.user + ' has loged in.');
            req.session.regenerate(function(){
                req.session.user = req.body.user;
                req.session.msg = "Welcome " + req.body.user;
                res.redirect('/dashboard');
            });
        }else{
            console.log("Bad authentication");
            req.session.err = "Erroneous credentials.";
            res.redirect("login");
        }
    });
};

exports.restrict = function(req, res, next){
    if(req.session.user){
        next();
    }else{
        req.session.error = "Access denied.";
        res.redirect('/login');
    }
};

exports.logout = function(req, res){
    req.session.destroy(function(){
        res.redirect('/');
    });
};
