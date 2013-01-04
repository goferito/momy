var sessions = require('../model/session');

exports.showAll = function(req, res){
    res.locals.menu = 'sessions';

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

        console.log(session);
        var timeUp = up.getHours()*2 + Math.round(up.getMinutes()/30);
        var timeDown = down.getHours()*2 + Math.round(down.getMinutes()/30);
        console.log('weekDayUp:'+weekDayUp);
        console.log('weekDayDown:'+weekDayDown);
        console.log('timeUp:'+timeUp);
        console.log('timeDown:'+timeDown);
        for(var w = weekDayUp; w <= weekDayDown; w++){
            if(w != weekDayUp) var h = 0;
            else var h = timeUp;
            while(h<48){
                if(w == weekDayDown && h==timeDown)
                    break;
                else
                    hotTimes[w][h]++;
                h++;
            }
        }

    }
    res.locals.hotTimes = JSON.stringify(hotTimes);
    console.log(JSON.stringify(hotTimes));
    res.locals.devices = [];
    for(a in devices){
        var percent = Math.round(devices[a]/totalSecs*100);
        res.locals.devices.push({'label': a + ' (' + percent + '%)',
                    'value': percent });
    }
    res.locals.totalSecs = humanizeTime(totalSecs);
    res.locals.dayTotals = dayTotals;

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
