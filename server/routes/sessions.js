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

        var up = new Date(session.up.substring(1,20));
        var down = new Date(session.down.substring(1,20));

        var sessionSecs = (down.getTime() - up.getTime())/1000;
        totalSecs += sessionSecs;
        weekTotals[up.getWeek()] += sessionSecs+0;
        dayTotals[up.getDay()+1/1] += sessionSecs+0;
        //+1 to make it start from monday instead sunday

        res.locals.totalSecs = humanizeTime(totalSecs);
        res.locals.weekTotals = weekTotals;
        res.locals.dayTotals = dayTotals;
        res.locals.sessions[i].time = humanizeTime(sessionSecs);

    }
    res.render('sessions');
};

exports.loadAll = function(req,res,next) {
    sessions.getAll(req.session.user, function(err, data){
        res.locals.sessions = !err ? data : {};
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
