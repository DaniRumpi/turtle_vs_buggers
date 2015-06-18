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


var Player = require("./server/Player").Player;	// Player class


/**************************************************
** GAME VARIABLES
**************************************************/
var socket,		// Socket controller
	players = [];	// Array of connected players

/**************************************************
** GAME INITIALISATION
**************************************************/
// Socket.IO
io.on('connection', onSocketConnection);
// New socket connection
function onSocketConnection(client) {
	console.log("New player has connected: " + client.id);
	client.on("disconnect", onClientDisconnect);
	client.on("new player", onNewPlayer);
	client.on("move player", onMovePlayer);
}

function onClientDisconnect() {
  console.log("Player has disconnected: "+this.id);

	var removePlayer = playerById(this.id);

	// Player not found
	if (!removePlayer) {
		console.log("Player not found: "+this.id);
		return;
	}

	// Remove player from players array
	players.splice(players.indexOf(removePlayer), 1);

	// Broadcast removed player to connected socket clients
	this.broadcast.emit("remove player", {id: this.id});
}

function onNewPlayer(data) {
  var newPlayer = new Player(data.x, data.y);
  newPlayer.id = this.id;
  this.broadcast.emit("new player", {id: newPlayer.id, x: newPlayer.getX(), y: newPlayer.getY()});
  
  // Send existing players to the new player
	var i, existingPlayer;
	for (i = 0; i < players.length; i++) {
		existingPlayer = players[i];
		this.emit("new player", {id: existingPlayer.id, x: existingPlayer.getX(), y: existingPlayer.getY()});
	}
	
	// Add new player to the players array
	players.push(newPlayer);
}

function onMovePlayer(data) {
  var movePlayer = playerById(this.id);
  
  if (!movePlayer) {
    console.log("Player not found: "+this.id);
    return;
  }
  
  movePlayer.setX(data.x);
  movePlayer.setY(data.y);
  
  this.broadcast.emit("move player", {id: movePlayer.id, x: movePlayer.getX(), y: movePlayer.getY()});
}

/**************************************************
** GAME HELPER FUNCTIONS
**************************************************/
// Find player by ID
function playerById(id) {
	var i = players.length - 1;
	for (i; i >= 0; i--) {
		if (players[i].id == id)
			return players[i];
	}
	
	return false;
}


// init
app.listen(8000);