var MyLayer = cc.Layer.extend({
  sprite:null,
  _player: null,
  _monsters: [],
  _projectiles:[],
  init:function () {
    this._super(); // 1. super init first
    _size = _designSize; // Global variable _designSize

    this.gameLogic();
    this.addPlayer();
    _shoot = this.shoot;

    if (cc.sys.capabilities.hasOwnProperty('keyboard')) {
      cc.eventManager.addListener({
        event: cc.EventListener.KEYBOARD,
        onKeyPressed: this.onKeyPressed,
        onKeyReleased: this.onKeyReleased
      }, this);
    }
    this.schedule(this.update);
  },
  collision: function(dt) {
    this.collision(dt);
  },
  update: function (dt) {
    var i, j, projectile, monster, projectileP, monsterP;
    for (i = this._projectiles.length - 1; i >= 0; i--) {
      projectile = this._projectiles[i];
      for (j = this._monsters.length - 1; j >= 0; j--) {
        monster = this._monsters[j];
        projectileP = projectile._position;
        monsterP = monster._position;
        if (cc.pDistance(projectileP, monsterP) <= monster._ratio) {
          cc.log("collision!");
          monster.stopAllActions();
          projectile.removeFromParent();
          this._projectiles.splice(i, 1);
          break;
        }
      }
    }
  },
  onKeyPressed: function(e) {
    _player.handleKey(e, true);
  },
  onKeyReleased: function(e) {
    if (e === cc.KEY.space) {
      _shoot();
    } else {
      _player.handleKey(e);
    }
  },
  addPlayer: function() {
    _player = this._player = new PlayerSprite(res.mainPlayer);
    this.addChild(this._player, 0);
  },
  addMonster: function() {
    _monster = this._monster = new MonsterSprite(res.bugger);
    this._monsters.push(_monster);
    this.addChild(this._monster, 1);
  },
  gameLogic: function(dt) {
    this.addMonster();
  },
  shoot: function() {
    var projectile = new ProjectileSprite(res.projectile);
    projectile.run(_layer, _player);
    _layer._projectiles.push(projectile);
    _layer.addChild(projectile, 2);
  },
});

var _layer;
var MyScene = cc.Scene.extend({
  onEnter:function () {
    this._super();
    _layer = new MyLayer();
    this.addChild(_layer);
    _layer.init();
    var colorLayer = new cc.LayerColor(cc.color(255,255,255), _size.width, _size.height);
    this.addChild(colorLayer, -1);
  }
});
