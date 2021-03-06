#Project Momy

![Alt MomyShot](https://raw.github.com/wiki/goferito/momy/momyShot.jpg "User activity charts")

Personal project aimed at trying to keep control of the amount of time I spend 
in front of my computers.

It consists of a client, written in bash. It creates a log file with the time 
sessions the computer is on, and when the user is idle. These logs are sent to
a web server and stored in a MongoDB database.

The server is powered by express.js, the node.js framework. The views are 
written in jade. In the front-end some charts are created with D3.js.

##Components
###Client
* Bash
* xprintidle; installed running the installation script.

*Client only tested for Ubuntu*

###Node server:
* [Express](http://expressjs.com/)
* [Mongoose](http://mongoosejs.com) for MongoDB
* [Jade](http://jade-lang.com/) for templating
* [Twitter Bootstrap](http://twitter.github.com/bootstrap/) for styling
* [D3.js](http://d3js.org) to create charts


##INSTALLATION

Clone the respository. 

Copy or rename the conf.default file to conf, and change it to set your configuration.

Execute the installation script. (/installer)


For the server, you first need to install the node modules required: 

    cd server
    npm install
    node ./app.js

MongoDB is required to run the server.


##Future
The clients only works on linux and it's only tested on ubuntu. For the very future,
client versions for windows or macOS could be developed.

The most immediate features i'm trying to develop are listed in the TODO file.



