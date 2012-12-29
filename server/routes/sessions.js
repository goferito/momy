var sessions = require('../model/session');

exports.showAll = function(req, res){
    res.locals.menu = 'sessions';
    console.log('rendering sesions');
    res.render('sessions');
};

exports.loadAll = function(req,res,next) {
    sessions.getAll(req.session.user, function(err, data){
        res.locals.sessions = !err ? data : {};
        console.log(res.locals.sessions);
        next();
    });
}

