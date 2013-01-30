
exports.saveActiveLog = function(req, res){
    var Active = require('../model/active').model;
    var log = req.body.log.split("\n");
    var upTime = null;
    var downTime = null;
    console.log("active log length:"+log.length);
    log.forEach(function(line){
        console.log(line);
        var time = line.substring(0, 21);
        var info = line.substring(22);

        if(info == 'ACTIVE'){
            upTime = time;
        }else if(info == "IDLE"){
            downTime = time;
            var active = new Active({ ip: req.ip,
                                        user: req.body.user,
                                        device: req.body.device,
                                        up: upTime,
                                        down: downTime
                                      });
            Active.find()
                    .where('up').equals(active.up)
                    .sort('idle')
                    .exec(function(err, data){
                        if(err)
                            console.log(err);
                        else{
                            if(data.length > 0){
                                //update it
                                data[0].down = active.down;
                                data[0].save(function(err){
                                    if(err) console.log("ERROR updating active.");
                                    else    console.log("Updated Data:"+data);
                                });
                            }else{
                                //save it
                                console.log("Saving new active...");
                                active.save(function(err, ses){
                                    if(err) console.log(err);
                                    else    console.log("Saved.");
                                });
                            }
                        }
                    });

            upTime = null;
            downTime = null;
        }else{
            console.log("ERROR: unexpected log line:");
            console.log(line);
            //TODO save the error in db?
        }

        /*
         * TODO
         * hay que detectar las sesiones. solo la ultima es la que viene de la ip actual.
         * si llegan mas de una sesion es pq el pc no pudo conectarse y enviar el log,
         * ergo la ip de sesiones que quedaron en el log es desconocida.
         */

    });
    res.send('MUMAL');
    //res.send('BENNE');
};

exports.saveLog = function(req, res){
    var Session = require('../model/session').model;
    var log = req.body.log.split("\n");
    var upTime = null;
    var downTime = null;
    console.log("Session log length:"+log.length);
    log.forEach(function(line){
        //console.log(line);
        var time = line.substring(0, 21);
        var info = line.substring(22);

        //console.log("time:"+time);
        //console.log("info:"+info);

        if(info == 'SYSTEM UP'){
            upTime = time;
        }else if(info == "SYSTEM DOWN"){
            downTime = time;
            var session = new Session({ ip: req.ip,
                                        user: req.body.user,
                                        device: req.body.device,
                                        up: upTime,
                                        down: downTime
                                      });
            Session.find()
                    .where('up').equals(session.up)
                    .sort('up')
                    .exec(function(err, data){
                        if(err)
                            console.error(err);
                        else{
                            if(data.length > 0){
                                //update it
                                data[0].down = session.down;
                                data[0].save(function(err){
                                    if(err) console.error("ERROR updating session.");
                                    //else    console.log("Updated Data:"+data);
                                });
                            }else{
                                //save it
                                //console.log("Saving new session...");
                                session.save(function(err, ses){
                                    if(err) console.error(err);
                                    //else    console.log("Saved.");
                                });
                            }
                        }
                    });

            //buscar en la bd la sesion que coincida el upTime.
            // actualizar los datos de esa sesion en la bd
            // si no existe add it
            upTime = null;
            downTime = null;
        }else{
            console.log("ERROR: unexpected log line:");
            console.log(line);
            //TODO save the error in db?
        }

        /*
         * TODO
         * hay que detectar las sesiones. solo la ultima es la que viene de la ip actual.
         * si llegan mas de una sesion es pq el pc no pudo conectarse y enviar el log,
         * ergo la ip de sesiones que quedaron en el log es desconocida.
         * aunque siempre llegaran dos sesiones cuando se enciende el equipo. 
         * como al cerrar el equipo ya no hay internete,
         * llegaran las dos ultimas por lo menos. hay que actualizar el downTime de la
         * session anterior.
         */

    });
    res.send("BRAVO");
}
