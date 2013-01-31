
exports.saveLog = function(req, res){
    var Session = require('../model/session').model;
    var log = req.body.log.split("\n");
    var upTime = null;
    var downTime = null;
    console.log("Session log ("+req.body.file+") length:"+log.length);
    log.forEach(function(line){
        //console.log(line);
        var time = line.substring(0, 21);
        var info = line.substring(22);

        if(info == 'UP'){
            upTime = time;
        }else if(info == "DOWN"){
            downTime = time;
            var session = new Session({ ip: req.ip,
                                        user: req.body.user,
                                        device: req.body.device,
                                        up: upTime,
                                        down: downTime,
                                        log: req.body.file
                                      });
            Session.find()
                    .where('up').equals(session.up)
                    .where('log').equals(req.body.file)
                    .sort('up')
                    .exec(function(err, data){
                        if(err)
                            console.error(err);
                        else{
                            console.log('--------session en cuestion:', session);
                            if(data.length > 0){
                                console.log('Exists. Will be updated.');
                                data[0].down = session.down;
                                data[0].save(function(err){
                                    if(err) console.error("ERROR updating session.");
                                });
                            }else{
                                console.log('Doent exist. Will be saved.');
                                session.save(function(err, ses){
                                    if(err) console.error(err);
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
         * aunque siempre llegaran dos sesiones cuando se enciende el equipo. 
         * como al cerrar el equipo ya no hay internete,
         * llegaran las dos ultimas por lo menos. hay que actualizar el downTime de la
         * session anterior.
         */

    });
    res.send("BRAVO");
}
