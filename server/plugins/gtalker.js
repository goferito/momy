var config = require('../config.js')
var xmpp = require('simple-xmpp')

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
    }
    if(child.name == 'caps:c'){
      console.log('Node: ',child.attrs.node)
      console.log('Ver: ',child.attrs.ver)
    }
  })
})

xmpp.connect({
    jid: config.gtid, 
    password: config.gtpass,
    host: 'talk.google.com',
    port: 5222
})

