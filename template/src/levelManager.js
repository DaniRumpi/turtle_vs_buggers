var LevelManager = cc.Class.extend({
  _level: null,
  _layer: null,
  level: null,
  ctor: function (gameLayer) {
    if (!gameLayer) {
      throw 'gameLayer must be non-nil';
    }
    this._layer = gameLayer;
    this._level = 2;
    if (!this.level) {
      this.setLevel();
    }
  },
  setLevel: function() {
    if (!this._level) {
      this.level = 0;
    }
    this.level = GAME.LEVELS[this._level];
  },
  nextLevel: function() {
    if (GAME.LEVELS[this._level + 1]) {
      this.setLevel(++this._level);
      return this._level;
    }
  },
  setup: function(layer) {
    this._layer = layer;
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
    _player = this._layer._player = new PlayerSprite(config.sprite);
    _player.setup(this._layer.space, config);
    this._layer._players.push(_player);
    this._layer.addChild(this._layer._player, 0);
    addCollisionCallbacks(this._layer.space, _player.collision, _player.separate);
  },
  addMonster: function(config) {
    var monster = new MonsterSprite(config.sprite);
    this._layer._monsters.push(monster);
    var layer = this._layer;
    this._layer.scheduleOnce(function() {
      monster.setup(layer.space, config);
      layer.addExplosion(EXPLOSION_RED, monster.position, 0);
      layer.addChild(monster, 1);
      monster.update();
    }, config.showTime);
  },
  checkLevel: function() {
    if (this._layer._players.length) {
      return this._layer._player._targetsDestroyed >= this.level.MAX_MONSTERS;
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
LevelManager.getInstance = function (layer) {
  if (!_levelManager) {
    _levelManager = new LevelManager(layer);
  }
  return _levelManager;
}