var mongoose = require('mongoose')
var model = require('../model/session')
var route = require('../routes/grass')
var fixtures = require('./fixtures')

//Connect to testing database
var con = mongoose.connect('mongodb://localhost/test')
mongoose.connection.db.dropDatabase();//TODO check if this is working

describe('Array', function(){
    describe('index of', function(){
        it('should return -1 when the value is not present', function(){
            [1,2,3].indexOf(5).should.be.equal(-1);
            [1,2,3].indexOf(0).should.be.equal(-1);
        });
    });
});

describe('Grass', function(){
    describe('Saving log', function(){
        it('should return an object with the same data in log', function(){
            console.log(fixtures.systemLogBody)
            //route.
            //simular un log
            //hacer un find de la collection de sessions y comprobar que se corresponde
            //con el log
        })
    })
})
