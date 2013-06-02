var config = require('../config.js')
var Session = require('../model/session').model;
var xmpp = require('simple-xmpp')
var dateUtils = require('date-utils')

var sess = {}

xmpp.on('online', function(){
  console.log('GTalker online')
})

xmpp.on('error', function(e){
  console.log('ERROR!',e)
})


xmpp.on('stanza', function(stanza){
  console.log('@@@@ %s STANZA @@@', stanza.name.toUpperCase())
  console.log('From: ', stanza.attrs.from)
  console.log('To: ', stanza.attrs.to)
  if(stanza.attrs.type)
    console.log("Type: ", stanza.attrs.type)
  stanza.children.map(function(child){
    if(child.name == 'show'){
      console.log('State: ',child.children[0])
      stanza.state = child.children[0]
    }
    if(child.name == 'caps:c'){
      console.log('Node: ',child.attrs.node)
      stanza.node = child.attrs.node
      console.log('Ver: ',child.attrs.ver)
      stanza.ver = child.attrs.ver
    }
  })

console.log('SESS\n', sess)

  if(stanza.name != 'presence') return;
  if ((!stanza.state && !stanza.attrs.type) || stanza.state == 'dnd') {
    //new session
    if(sess[stanza.from]) return;
    var node = 'unknown'
    if(stanza.node.indexOf('android') != -1) node = 'Android';
    if(stanza.node.indexOf('mail.google.com')) node = 'Gmail'
    var user = stanza.to.substring(0, stanza.to.indexOf('.momy@'))
    var gtalker = stanza.from.substring(0, stanza.from.indexOf('@'))
    sess[stanza.from] = { ip: 'Google',
                          user: user,
                          device: node,
                          up: new Date().toFormat("[YYYY-MM-DD HH24:MI:SS]"),
                          down: null,
                          log: 'gtalker.'+gtalker
                        };
    console.log('Registered opened gtalker session.')
  }
  if (stanza.attrs.type == 'unavailable' || stanza.state == 'away') {
    //finish session
    console.log('gonna save')
    if(!sess[stanza.from]) return;
    sess[stanza.from].down = new Date().toFormat("[YYYY-MM-DD HH24:MI:SS]")
    var s = new Session(sess[stanza.from])
    s.save(function(err, ses){
      console.log('Saving gtalker session...')
      sess[stanza.from] = null
      if(err) console.error(err)
    })
  }
})

xmpp.on('chat', function(from, msg){
  console.log(new Date() + "MSG from:" + from + ":" + msg)
  xmpp.send(from, 'Entschuldigung, Im just a bot. Im not able to understand you. Not Yet...')
})

xmpp.connect({
    jid: config.gtid, 
    password: config.gtpass,
    host: 'talk.google.com',
    port: 5222
})

