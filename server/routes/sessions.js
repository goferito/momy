var mongoose = require('mongoose');
var Session = mongoose.model('Session');

exports.showAll = function(req, res){
    res.locals.menu = 'sessions';
    Session.find({user: req.session.user})
            .exec(function(err, data){
                if(err) console.log(err);
                else{
                    res.locals.sessions = data;
                    res.render('sessions');
                }
            });
};

exports.loadAll = function() {
    // body...
}

