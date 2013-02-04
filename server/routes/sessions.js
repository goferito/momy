var sessions = require('../model/session');

var log = null;


exports.loadSystem = function(req,res,next) {
    loadSessions('system', req, res, next);
};

exports.loadActive = function(req, res, next){
    loadSessions('active', req, res, next);
};


exports.showSystem = function(req, res){
    res.locals.menu = 'system';
    calculateTotals('system', req, res);
};

exports.showActive = function(req, res){
    res.locals.menu = 'active';
    calculateTotals('active', req, res);
};

function calculateTotals(log, req, res){

    var totalSecs = 0;
    var devices = [];
    var dayTotals = [];
    for(var j=0;j<7;j++) dayTotals[j]=0;   //  7 days per week
    var hotTimes = [];
    for(var j=0;j<7;j++){
        hotTimes[j]=[];
        for(var k=0; k<48; k++) //48 halfs of hours
            hotTimes[j][k]=0;
    }

    for(i in res.locals.sessions){
        session = res.locals.sessions[i];

        if(!session.up || !session.down) continue;
        var up = new Date(session.up.substring(1,20));
        var down = new Date(session.down.substring(1,20));
        var weekDayUp = (up.getDay()+6)%7;  //+6%7 to make weeks start on monday
        var weekDayDown = (down.getDay()+6)%7;
        var sessionSecs = (down.getTime() - up.getTime())/1000;

        totalSecs += sessionSecs;
        dayTotals[weekDayUp] += sessionSecs+0;
        

        if(devices[session.device]) devices[session.device] += sessionSecs;
        else devices[session.device] = sessionSecs;

        res.locals.sessions[i].time = humanizeTime(sessionSecs);

        var timeUp = up.getHours()*2 + Math.round(up.getMinutes()/30);
        var timeDown = down.getHours()*2 + Math.round(down.getMinutes()/30);
        var w = weekDayUp;
        var h = timeUp;
        while(w != weekDayDown || h != timeDown ){
            hotTimes[w][h]++;
            h++;
            if(h==48){
                h=0;
                w=(w+1)%7
            }
        }

    }
    res.locals.hotTimes = JSON.stringify(hotTimes);
    res.locals.devices = [];
    for(a in devices){
        var percent = Math.round(devices[a]/totalSecs*100);
        res.locals.devices.push({'label': a + ' (' + percent + '%)',
                    'value': percent });
    }
    res.locals.totalSecs = humanizeTime(totalSecs);
    res.locals.dayTotals = dayTotals;

    res.render('sessions');
}

function loadSessions(log, req, res, next){
    sessions.getAll(log, req.session.user, function(err, data){
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
