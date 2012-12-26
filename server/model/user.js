var mongoose = require("mongoose");
var User = new mongoose.Schema({
                                username: String,
                                password: String
                            });

mongoose.model('User', User);
exports.model = mongoose.model('User');
