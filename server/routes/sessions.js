var mongoose = require('mongoose');
var Session = mongoose.model('Session');

exports.loadAll = function(req, res){
    Session.find({user: req.session.user})
            .exec(function(err, data){
                if(err) console.log(err);
                else{
                    res.send(data);
                    for(var i=0; i<data.length; i++){
                       console.log(data[i].up + data[i].down);
                    }
                }
            });
};

exports.loadAll = function() {
    // body...
}

