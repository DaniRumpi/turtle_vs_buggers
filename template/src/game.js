function addCollisionCallbacks(space, collision, separate) {
  // Monsyers touch Player
  space.addCollisionHandler(1,2, collision, null, null, separate);
}

var MyLayer = cc.Layer.extend({
  init:function () {
    this._super(); // 1. super init first
    this.space = null;
    this._player = null;
    this._players = [];
    this._monsters = [];
    this._projectiles = [];
    this.initPhysics();
    setupAnimations(this);

    this.levelManager = LevelManager.getInstance(this);
    this.levelManager.setup(this);
    
    if (cc.sys.capabilities.hasOwnProperty('keyboard')) {
      cc.eventManager.addListener({
        event: cc.EventListener.KEYBOARD,
        onKeyPressed: this.onKeyPressed,
        onKeyReleased: this.onKeyReleased
      }, this);
    }
    this.schedule(this.checkLevel, 0.5);
    this.schedule(this.update);
    this.addQuitMenuItem();
  },
  // init space of chipmunk
  initPhysics: function() {
    this.space = new cp.Space();
    this.space.gravity = cp.v(0, 0);
    //Add the Debug Layer:
    // var debugNode = new cc.PhysicsDebugNode(this.space);
    // debugNode.visible = true;
    // this.addChild(debugNode);

    addWallsAndGround(this.space);
  },
  update: function (dt) {
    this.space.step(dt); // Chipmunk space
    // collision
    var i, j, projectile, monster;
    for (i = this._projectiles.length - 1; i >= 0; i--) {
      projectile = this._projectiles[i];
      for (j = projectile.targets.length - 1; j >= 0; j--) {
        target = projectile.targets[j];
        if (target.visible && cc.pDistance(projectile._position, target._position) <= target._ratio) {
          this._projectiles.splice(i, 1);
          if (target.hurt(projectile._power)) {
            projectile.origin._targetsDestroyed++;
          }
          projectile.autodestroy();
          break;
        }
      }
    }
  },
  checkLevel: function() {
    if (this.levelManager.checkLevel()) {
      this.gameOver(true);
    }
  },
  onKeyPressed: function(e) {
    _player.handleKey(e, true);
  },
  onKeyReleased: function(e) {
    if (e === cc.KEY.space) {
      _layer.shoot(_layer._player, _layer._monsters);
    } else {
      _player.handleKey(e);
    }
  },
  shoot: function(origin, target, power, delay) {
    if (!target) {
      target = _layer._monsters;
    }
    var projectile = new ProjectileSprite(res.projectile);
    var func = function() {
      projectile.run(_layer, origin, target, power);
      _layer._projectiles.push(projectile);
      _layer.addChild(projectile, 2);
    };
    if (delay) {
      _layer.scheduleOnce(func, delay);
    } else {
      func();
    }
  },
  addExplosion: function (name, position, offset, color) {
    if (offset === undefined) {
      offset = 0;
    }
    var explosion = new Explosion(name, color);
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
    this.update = function(){};

    var message, nextLevel;
    if (won) {
      nextLevel = this.levelManager.nextLevel();
    }
    if (!won || !nextLevel) {
      this.levelManager.reset();
      cc.director.runScene(new cc.TransitionFade(2, GameOver.newScene(won)));
    } else {
      message = this.levelManager.toString();
      cc.director.pushScene(new cc.TransitionFade(2, Message.newScene(message)));
    }
  }
});

var _layer;
var Game = cc.Scene.extend({
  onEnter: function() {
    this._super();
    _layer = new MyLayer();
    this.addChild(_layer);
    _layer.init();
  }
});
