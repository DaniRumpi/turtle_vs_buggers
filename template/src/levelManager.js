var LevelManager = cc.Class.extend({
  _level: null,
  _layer: null,
  level: null,
  ctor: function (gameLayer, multiplayer) {
    if (!gameLayer) {
      throw 'gameLayer must be non-nil';
    }
    this._layer = gameLayer;
    this._level = 0;
    this.multiplayer = multiplayer;
    if (!this.level) {
      this.setLevel();
    }
  },
  setLevel: function() {
    if (!this._level) {
      this.level = 0;
    }
    this.level = this.getLevel(this._level);
  },
  getLevel: function(level) {
    if (this.multiplayer) {
      return GAME.MULTIPLAYER[level];
    } else {
      return GAME.LEVELS[level];
    }
  },
  nextLevel: function() {
    if (this.getLevel(this._level + 1)) {
      this.setLevel(++this._level);
      return this._level;
    }
  },
  setup: function(layer) {
    this._layer = layer;
    // Load Background
    BackgroundSky.create(this.level.BG.sprite, this.level.BG.color);
    // Load Player
    for (i = this.level.PLAYERS.length - 1; i >= 0; i--) {
      this.addPlayer(this.level.PLAYERS[i]);
    }
    // Load Monsters
    for (i = this.level.MONSTERS.length - 1; i >= 0; i--) {
      this.addMonster(this.level.MONSTERS[i]);
    }
  },
  addPlayer: function(config) {
    _player = this._layer._player = new PlayerSprite(config);
    this._layer._players.push(_player);
    addCollisionCallbacks(this._layer.space, _player.collision, _player.separate);
  },
  addMonster: function(config) {
    var monster = new MonsterSprite(config, {});
    this._layer._monsters.push(monster);
  },
  checkLevel: function() {
    if (this._layer._players.length) {
      return this._layer._player._targetsDestroyed >= this.level.LIMIT_MONSTERS;
    }
    return false;
  },
  toString: function() {
    return 'Level ' + (this._level + 1);
  },
  reset: function() {
    this._level = 0;
    this.setLevel();
  }
});

var _levelManager;
LevelManager.getInstance = function (layer, multiplayer) {
  if (!_levelManager) {
    _levelManager = new LevelManager(layer, multiplayer);
  }
  return _levelManager;
}