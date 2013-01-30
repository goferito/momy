var mongoose = require("mongoose");
var ActiveSchema = new mongoose.Schema({
                                            user: String,
                                            device: String,
                                            up: String,
                                            down: String,
                                            ip: String
                                        });

var Active = mongoose.model('Active', ActiveSchema);

exports.model = mongoose.model('Active');


exports.getAll = function(user, callback) {
    Active.find({user: user})
            .sort('-up')
            .select('ip device up down')
            .exec(function(err, data){
                if(err) console.error(err);
                callback(err, data);
            });
}
