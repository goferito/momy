var sessions = require('../model/session');

exports.showAll = function(req, res){
    res.locals.menu = 'sessions';

    Date.prototype.getWeek = function() {
        var onejan = new Date(this.getFullYear(),0,1);
        return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
    } 

    var totalSecs = 0;
    var weekTotals = [];
    var dayTotals = [];
    for(var j=0;j<52;j++) weekTotals[j]=0; // 52 weeks every year
    for(var j=0;j<7;j++) dayTotals[j]=0;   //  7 days per week
    for(i in res.locals.sessions){
        session = res.locals.sessions[i];
        console.log(session);

        var up = new Date(session.up.substring(1,20));
        var down = new Date(session.down.substring(1,20));

        /*
        console.log("week:" + up.getWeek());
        console.log("day:" + up.getDay());
        console.log(up);
        console.log(down);
        console.log((down.getTime() - up.getTime())/1000);
        */

        var sessionSecs = (down.getTime() - up.getTime())/1000;
        totalSecs += sessionSecs;
        weekTotals[up.getWeek()] += sessionSecs+0;
        dayTotals[up.getDay()] += sessionSecs+0;

        res.locals.totalSecs = totalSecs;
        res.locals.weekTotals = weekTotals;
        res.locals.dayTotals = dayTotals;
        res.locals.sessions[i].secs = sessionSecs;

    }
    console.log(weekTotals);
    console.log(dayTotals);
    console.log(res.locals.sessions.length);
    console.log(new Date());
    res.render('sessions');
};

exports.loadAll = function(req,res,next) {
    sessions.getAll(req.session.user, function(err, data){
        res.locals.sessions = !err ? data : {};
        next();
    });
}

