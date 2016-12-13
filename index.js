//imports
    //const express = require('express')
    //const app = express()
    //const server = require('http').Server(app);
    //const io = require('socket.io')(server)

    const app = require('express')();
    const server = require('http').Server(app);
    const io = require('socket.io')(server);

//usr defined
    const GOOGLEAPIKEY = "AIzaSyBBSyorS_heHX_gfcOnMlILRTvQbpxZwIo"
    let gamesDict = {} //{ "room_name" : {info}, }

server.listen(2300);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/html/begin.html');
}); 

io.on('connection', function(socket){
    console.log('a user connected!' + socket.id);
    socket.on('startgame', function(info){
        console.log("startgame initated by " + socket.id);
        makeRoom(info, socket.id).then(function(){
            console.log("room made ");
            console.log(gamesDict);
            //socket.join(info.rname);
            //io.to(info.rname),emit('gameSetup', gamesDict[info.rname])
            io.emit('gameSetup')
    });
    });
    socket.on('joingame', function(info){
        console.log("game joined by " + socket.id);
        joinGame(info, socket.id);
        //socket.join(info.rname);
    });
});

function makeRoom(info, sID){
    //add game to dict
    return new Promise(function(resolve, reject){
        gamesDict[info.rname] = {
            master: sID,
            masterName : info.pname,
            gameCenter : { lat: info.lat, lng: info.lng},
            players : [(info.pname, sID)]
        }
        resolve();
    })
}

function joinGame(info, sID){
    if(gamesDict[info.rname]){

    } else {
        
    }
}