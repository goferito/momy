var mongoose = require("mongoose");
var Session= new mongoose.Schema({
                                    user: String,
                                    device: String,
                                    up: String,
                                    down: String,
                                    ip: String
                                });

mongoose.model('Session', Session);
exports.model = mongoose.model('Session');