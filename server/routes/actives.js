var actives = require('../model/active');

exports.showAll = function(req, res){
    res.locals.menu = 'active';
    res.locals.actives.map(function(session){
        var up = new Date(session.up.substring(1,20));
        var down = new Date(session.down.substring(1,20));
        var weekDayUp = (up.getDay()+6)%7;  //+6%7 to make weeks start on monday
        var weekDayDown = (down.getDay()+6)%7;
        var sessionSecs = (down.getTime() - up.getTime())/1000;
        session.time = humanizeTime(sessionSecs);
    });
    res.render('actives');
}

exports.loadAll = function(req, res, next){
    actives.getAll(req.session.user, function(err, data){
        res.locals.actives = !err ? data : {};
        next();
    });
}
function humanizeTime (secs) {
    if(secs < 60) return secs+' secs.';
    var min = Math.round((secs / 60), 0);
    if(min < 60) return min + ' mins';
    var hour = Math.round((min / 60), 0);
    min = min % 60;
    if(min == 0) return hour + ' hours';
    return hour + ' hours, ' + min + ' mins';
}
