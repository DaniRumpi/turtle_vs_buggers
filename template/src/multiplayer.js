/**************************************************
** GAME HELPER FUNCTIONS
**************************************************/
var _players = [], _monsters = [], _socket;
// Find player by ID
function playerById(id) {
	var i;
	for (i = 0; i < _players.length; i++) {
		if (_players[i].id == id)
			return _players[i];
	}
	return false;
}

var Multiplayer = cc.Class.extend({
  _level: null,
  _layer: null,
  level: null,
  players: [],
  monsters: [],
  ctor: function (gameLayer) {
    this._layer = gameLayer;
    _socket = this.socket = io("ws://localhost:8000");
    this.socket.on("connect", this.onSocketConnected);
    this.socket.on("disconnect", this.onSocketDisconnect);
    this.socket.on("new player", this.onNewPlayer);
    this.socket.on("move player", this.onMovePlayer);
    this.socket.on("remove player", this.onRemovePlayer);
    
    this.socket.on("new monster", this.onNewMonster);
    this.socket.on("update monsters", this.onUpdateMonsters);
    _players = this.players;
    _monsters = this.monsters;
  },
  onSocketConnected: function() {
    cc.log("Connected to socket server");
    _socket.emit("new player", {
      x: _player.positionX,
      y: _player.positionY,
      r: _player.rotation
    });
  },
  onSocketDisconnect: function() {
    cc.log("Disconnected from socket server");
  },
  onNewPlayer: function(data) {
    cc.log("New player connected: " + data.id);
    // Initialise the new player
  	var newPlayer = new PlayerSprite(PLAYER, {
  	  x: data.x,
  	  y: data.y,
  	  r: data.r,
  	  remote: true
  	});
  	newPlayer.id = data.id;
  	// Add new player to the remote players array
  	_players.push(newPlayer);
  },
  onMovePlayer: function(data) {
    cc.log("onMovePlayer ...", data);
    var movePlayer = playerById(data.id);
  	// Player not found
  	if (!movePlayer) {
  		cc.log("Player not found: "+data.id);
  		return;
  	}
  	// Update player position
  	movePlayer.setup(data);
  },
  onRemovePlayer: function(data) {
    var removePlayer = playerById(data.id);
  	// Player not found
  	if (!removePlayer) {
  		cc.log("Player not found: " + data.id);
  		return;
  	}
  	// Remove player from array
  	_players.splice(_players.indexOf(removePlayer), 1);
  	removePlayer.removeFromParent();
  },
  onNewMonster: function(data) {
    cc.log("New monster connected: " + data.id);
    // Initialise the new player
  	var newMonster = new MonsterSprite(BUGGER1, {
  	  x: data.x,
  	  y: data.y,
  	  r: data.r,
  	  aimX: data.aimX,
  	  aimY: data.aimY,
  	  remote: true
  	});
  	newMonster.id = data.id;
  	// Add new player to the remote players array
  	_monsters.push(newMonster);
  },
  onUpdateMonsters: function(data) {
    var i = data.monsters.length - 1;
    for (i; i >= 0; i--) {
      data.monsters[i].setup(data);
    }
  },
  emitMovePlayer: function(data) {
    cc.log("emitMovePlayer :: ", data);
    _socket.emit("move player", data);
  }
});


var _multiplayer;
Multiplayer.getInstance = function (layer) {
  if (!_multiplayer) {
    _multiplayer = new Multiplayer(layer);
  }
  return _multiplayer;
}