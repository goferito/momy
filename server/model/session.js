var config = require("../config");
var mongoose = require("mongoose");
var db = mongoose.connect(config.mongo.host);
var SessionSchema = new mongoose.Schema({
                                            user: String,
                                            device: String,
                                            up: String,
                                            down: String,
                                            ip: String
                                        });

mongoose.model('Session', SessionSchema);
var Session = mongoose.model('Session');

exports.model = Session;
