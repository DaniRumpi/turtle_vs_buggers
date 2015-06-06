
var MyLayer = cc.Layer.extend({
  sprite:null,
  _player: null,
  _monsters: [],
  init:function () {
    // 1. super init first
    this._super();

    var size = cc.director.getWinSize();
    this.size = size;
    
    this.addPlayer();

    if (cc.sys.capabilities.hasOwnProperty('keyboard')) {
      cc.eventManager.addListener({
        event: cc.EventListener.KEYBOARD,
        onKeyPressed: this.onKeyPressed,
        onKeyReleased: this.onKeyReleased
      }, this);
    }
    
    this._player.scheduleUpdate();
    this.gameLogic();
  },
  update: function(dt) {
  },
  onKeyPressed: function(e) {
    _player.handleKey(e, true);
  },
  onKeyReleased: function(e) {
    _player.handleKey(e);
  },
  addPlayer: function() {
    this._player = new playerSprite(res.mainPlayer);
    this.setPosition(new cc.Point(0,0));
    this._player.setScale(0.5);
    this.addChild(this._player, 0);
    this._player.setPosition(new cc.Point(this.size.width/2, this.size.height/2));
    _player = this._player;
  },
  addMonster: function() {
    var monster = new cc.Sprite(res.bugger);
    this.addChild(monster); // 2
    
    var minY = monster.getContentSize().height / 2;
    var maxY = this.size.height - monster.getContentSize().height / 2;
    var rangeY = maxY - minY;
    var actualY = (Math.random() * rangeY) + minY;
    var actualX = monster.getContentSize().width;
    
    monster.setPosition(new cc.Point(actualX, actualY));
    monster.setScale(0.4);
    monster.setTag(1);
    this._monsters.push(monster); // 6
  },
  gameLogic: function(dt) {
    this.addMonster();
  }
});

var MyScene = cc.Scene.extend({
  onEnter:function () {
    this._super();
    var layer = new MyLayer();
    this.addChild(layer);
    layer.init();
  }
});
