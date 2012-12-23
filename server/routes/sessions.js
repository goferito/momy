var Session = require('../model/session').model;

exports.showAll = function(req, res){
    res.send("Sessions are coming...");
    Session.find()
            .exec(function(err, data){
                if(err) console.log(err);
                else{
                    //console.log(data);
                    for(var i=0; i<data.length; i++){
                       console.log(data[i].up + data[i].down);
                       res.send(data[i].up + data[i].down);
                    }
                }
            });
};

