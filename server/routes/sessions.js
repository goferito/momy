var sessions = require('../model/session');

exports.showAll = function(req, res){
    res.locals.menu = 'sessions';
    for(i in res.locals.sessions){
        session = res.locals.sessions[i];
        var up = new Date(session.up.substring(1,20));
        var down = new Date(session.down.substring(1,20));
        console.log(up);
        console.log(down);
        console.log((down.getTime() - up.getTime())/1000);
        var sessionSecs = (down.getTime() - up.getTime())/1000;
        res.locals.sessions[i].secs = sessionSecs;
    }
    res.render('sessions');
};

exports.loadAll = function(req,res,next) {
    sessions.getAll(req.session.user, function(err, data){
        res.locals.sessions = !err ? data : {};
        next();
    });
}

