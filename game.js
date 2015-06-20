/**************************************************
** NODE.JS REQUIREMENTS
**************************************************/
var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var fs = require('fs');

if (typeof String.prototype.startsWith !== 'function') {
  String.prototype.startsWith = function (str){
    return this.indexOf(str) === 0;
  };
}

var resource;
function handler (req, res) {
  function callback(err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }
    res.writeHead(200);
    res.end(data);
  }
  resource = req.url.split("?")[0];
  if (resource === "/" || resource === "/index.html") {
    fs.readFile(__dirname + "/template/index.html", callback);
  } else if (resource === "/main.js" || resource === "/project.json") {
    fs.readFile(__dirname + "/template" + resource, callback);
  } else if (resource.startsWith("/res") || resource.startsWith("/src")) {
    fs.readFile(__dirname + "/template" + resource, callback);
  } else if (resource.startsWith("/engine")) {
    fs.readFile(__dirname + "/template" + resource, callback);
  } else {
    fs.readFile(__dirname + "/template/engine" + resource, callback);
  }
}


var Player = require("./server/Player").Player;
var Monster = require("./server/Monster").Monster;
var MonstersController = require("./server/MonstersController").MonstersController;
var GAME = require('./_config.js').GAME;


/**************************************************
** GAME VARIABLES
**************************************************/
var socket,
	players = [],
	monsters = [],
	clients = 0;

/**************************************************
** GAME INITIALISATION
**************************************************/
// Socket.IO
io.on('connection', onSocketConnection);
// New socket connection
function onSocketConnection(client) {
  clients++;
	console.log("New player has connected: " + client.id);
	client.on("disconnect", onClientDisconnect);
	client.on("new player", onNewPlayer);
	client.on("move player", onMovePlayer);
}



function onClientDisconnect() {
  console.log("Player has disconnected: " + this.id);
	var removePlayer = playerById(this.id);
	// Player not found
	if (!removePlayer) {
		console.log("Player not found: " + this.id);
		return;
	}
	clients--;
	// Remove player from players array
	players.splice(players.indexOf(removePlayer), 1);
	// Broadcast removed player to connected socket clients
	this.broadcast.emit("remove player", {id: this.id});
}

function onNewPlayer(data) {
  var newPlayer = new Player(data);
  newPlayer.id = this.id;
  this.broadcast.emit("new player", {
    id: newPlayer.id,
    x: newPlayer.getX(),
    y: newPlayer.getY(),
    r: newPlayer.getR()
  });
  
  // Send existing players to the new player
	var i, existingPlayer, existingMonster;
	for (i = players.length - 1; i >= 0; i--) {
		existingPlayer = players[i];
		this.emit("new player", {
		  id: existingPlayer.id,
		  x: existingPlayer.getX(),
		  y: existingPlayer.getY(),
		  r: existingPlayer.getR()
		});
	}
	for (i = monsters.length - 1; i >= 0; i--) {
		existingMonster = monsters[i];
		this.emit("new monster", {
		  id: existingMonster.id,
		  x: existingMonster.getX(),
		  y: existingMonster.getY(),
      aimX: existingMonster.getAimX(),
      aimY: existingMonster.getAimY()
		});
	}
	
	// Add new player to the players array
	players.push(newPlayer);
}

function onMovePlayer(data) {
  var movePlayer = playerById(this.id);
  
  if (!movePlayer) {
    console.log("Player not found: " + this.id);
    return;
  }
  
  movePlayer.setX(data.x);
  movePlayer.setY(data.y);
  movePlayer.setR(data.r);
  
  this.broadcast.emit("move player", {
    id: movePlayer.id,
    x: movePlayer.getX(),
    y: movePlayer.getY(),
    r: movePlayer.getR()
  });
}

/**************************************************
** MAIN LOOP
**************************************************/
var monstersController = new MonstersController(GAME, Monster, monsters);
var interval = setInterval(function() {
  if (clients <= 0) return;
  var newMonsters = monstersController.getRandomMonsters();
  var newMonster, i;
  for (i = newMonsters.length - 1; i >= 0; i--) {
		newMonster = newMonsters[i];
		io.sockets.emit("new monster", {
		  id: newMonster.id,
		  x: newMonster.getX(),
		  y: newMonster.getY()
		});
		monsters.push(newMonster);
	}

  var updated = monstersController.updateAll();
  var existingMonster;
  for (i = monsters.length - 1; i >= 0; i--) {
		existingMonster = monsters[i];
		io.sockets.emit("update monster", {
		  id: existingMonster.id,
		  x: existingMonster.getX(),
		  y: existingMonster.getY(),
      aimX: existingMonster.getAimX(),
      aimY: existingMonster.getAimY()
		});
	}
}, 500);

/**************************************************
** GAME HELPER FUNCTIONS
**************************************************/
// Find player by ID
function playerById(id) {
	var i = players.length - 1;
	for (i; i >= 0; i--) {
		if (players[i].id === id)
			return players[i];
	}
	return false;
}


// init
app.listen(8000);