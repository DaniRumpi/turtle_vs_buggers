var ScoreLabel = cc.Class.extend({
  ctor: function (gameLayer, multiplayer) {
    if (!gameLayer) {
      throw 'gameLayer must be non-nil';
    }
    this.multiplayer = multiplayer;
    this._layer = gameLayer;
    this._player = this._layer._player;
  },
  backup: function() {
    this.setHealth(this._player._health);
    this.setShoots(this._player._shoots);
    this.setTargetsDestroyed(this._player._targetsDestroyed);
  },
  addHighscore: function() {
    var highscores, hs = cc.sys.localStorage.getItem("highscores");
    try {
      highscores = JSON.parse(hs);
    } catch(e) {
      highscores = [];
    }
    if (typeof highscores.push !== "function") { // no array
      highscores = [];
    }
    highscores.push(this.getScore());
    hs = JSON.stringify(highscores);
    cc.sys.localStorage.setItem("highscores", hs);
  },
  getHighscores: function() { // might return null
    try {
      return JSON.parse(cc.sys.localStorage.getItem("highscores"));
    } catch(e) {
      return null;
    }
  },
  reset: function() {
    this.setHealth(0);
    this.setShoots(0);
    this.setTargetsDestroyed(0);
  },
  setup: function(player) {
    this._player = player;
    this._player._health += this.getHealth();
    this._player._shoots += this.getShoots();
    this._player._targetsDestroyed += this.getTargetsDestroyed();
    this.setHealth(this._player._health);
    this.setShoots(this._player._shoots);
    this.setTargetsDestroyed(this._player._targetsDestroyed);
  },
  getHealth: function() {
    return parseInt(cc.sys.localStorage.getItem("health")) || 0;
  },
  getShoots: function() {
    return parseInt(cc.sys.localStorage.getItem("shoots")) || 0;
  },
  getTargetsDestroyed: function() {
    return parseInt(cc.sys.localStorage.getItem("targetsDestroyed")) || 0;
  },
  setHealth: function(h) {
    cc.sys.localStorage.setItem("health", h);
  },
  setShoots: function(s) {
    cc.sys.localStorage.setItem("shoots", s);
  },
  setTargetsDestroyed: function(td) {
    cc.sys.localStorage.setItem("targetsDestroyed", td);
  },
  getScore: function() {
    return this._player._health + this._player._shoots*5 + this._player._targetsDestroyed*10;
  },
  addScoreLabel: function() {
    this._textScore = "Score: 0";
    this._labelScore = cc.LabelTTF.create(this._textScore, "Helvetica Neue", 20);
    this._labelScore.setColor(cc.color(255,255,255));
    this._labelScore.setPosition(60, _size.height - 20);
    _layer.addChild(this._labelScore);
  },
  updateScoreLabel: function() {
    this._labelScore.setString("Score: " + this.getScore());
  },
});

var _scoreLabel;
ScoreLabel.getInstance = function (layer, multiplayer) {
  if (!_scoreLabel) {
    _scoreLabel = new ScoreLabel(layer, multiplayer);
  }
  _scoreLabel.multiplayer = multiplayer;
  return _scoreLabel;
};
