function addCollisionCallbacks(space, collision, separate) {
  // Monsyers touch Player
  space.addCollisionHandler(1,2, collision, null, null, separate);
}

var MyLayer = cc.Layer.extend({
  space: null,
  _player: null,
  _monsters: [],
  _projectiles:[],
  _explosions: null,
  init:function () {
    this._super(); // 1. super init first
    this.initPhysics();
    setupAnimations(this);

    this.addPlayer();
    if (cc.sys.capabilities.hasOwnProperty('keyboard')) {
      cc.eventManager.addListener({
        event: cc.EventListener.KEYBOARD,
        onKeyPressed: this.onKeyPressed,
        onKeyReleased: this.onKeyReleased
      }, this);
    }
    this.schedule(this.update);
    this.schedule(this.gameLogic, 3, 3);
    this.scheduleOnce(this.addMonster, 1.0);

    this.addQuitMenuItem();
  },
  // init space of chipmunk
  initPhysics: function() {
    this.space = new cp.Space();
    this.space.gravity = cp.v(0, 0);
    //Add the Debug Layer:
    var debugNode = new cc.PhysicsDebugNode(this.space);
    debugNode.visible = true;
    this.addChild(debugNode);

    addWallsAndGround(this.space);
  },
  update: function (dt) {
    this.space.step(dt); // Chipmunk space
    // collision
    var i, j, projectile, monster;
    for (i = this._projectiles.length - 1; i >= 0; i--) {
      projectile = this._projectiles[i];
      for (j = this._monsters.length - 1; j >= 0; j--) {
        monster = this._monsters[j];
        if (cc.pDistance(projectile._position, monster._position) <= monster._ratio) {
          this.addExplosion("explosion_yellow", monster._position, 3);
          this._projectiles.splice(i, 1);
          this._monsters.splice(j, 1);
          projectile.destroy();
          monster.destroy();
          break;
        }
      }
    }
    if (this._player._monstersDestroyed >= GAME.LEVELS[0].MONSTERS.length) {
      this.gameOver(true);
    }
  },
  onKeyPressed: function(e) {
    _player.handleKey(e, true);
  },
  onKeyReleased: function(e) {
    if (e === cc.KEY.space) {
      _layer.shoot();
    } else {
      _player.handleKey(e);
    }
  },
  addPlayer: function() {
    _player = this._player = new PlayerSprite(res.mainPlayer);
    this._player.setup(this.space);
    this.addChild(this._player, 0);
    addCollisionCallbacks(this.space, this._player.collision, this._player.separate);
  },
  addMonster: function() {
    _monster = this._monster = new MonsterSprite(res.bugger);
    this._monster.setup(this.space);
    this._monsters.push(_monster);
    this.addChild(this._monster, 1);
    this.addExplosion("explosion_red", this._monster.position, 0);
  },
  shoot: function() {
    var projectile = new ProjectileSprite(res.projectile);
    projectile.run(_layer, _player);
    _layer._projectiles.push(projectile);
    _layer.addChild(projectile, 2);
  },
  addExplosion: function (name, position, offset) {
    if (offset === undefined) {
      offset = 0;
    }
    var explosion = new Explosion(name);
    this.addChild(explosion, offset);
    explosion.play(position);
  },
  gameLogic: function(dt) {
    this.addMonster();
  },
  addQuitMenuItem: function() {
    // add a "close" icon to exit the game
    var closeItem = new cc.MenuItemImage(res.CloseNormal_png, res.CloseSelected_png, this.onQuit);
    closeItem.setPosition(cc.p(_size.width - 20, _size.height - 20));
    closeItem.setAnchorPoint(cc.p(0.5, 0.5));
    var menu = new cc.Menu(closeItem);
    menu.setPosition(cc.p());
    this.addChild(menu, 4);
  },
  onQuit: function() {
    cc.director.runScene(new SysMenu());
  },
  gameOver: function(won) {
    this.unscheduleAllCallbacks();
    this._player.unscheduleAllCallbacks();
    for (i = this._monsters.length - 1; i >= 0; i--) {
      this._monsters[i].unscheduleAllCallbacks();
    }
    cc.director.runScene(new cc.TransitionFade(2, GameOver.newScene(won)));
  }
});

var _layer;
var Game = cc.Scene.extend({
  onEnter:function () {
    this._super();
    _layer = new MyLayer();
    this.addChild(_layer);
    _layer.init();
    var colorLayer = new cc.LayerColor(cc.color(100,100,100), _size.width, _size.height);
    this.addChild(colorLayer, -1);
  }
});
