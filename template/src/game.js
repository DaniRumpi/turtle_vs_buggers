function addCollisionCallbacks(space, collision, separate) {
  // Monsyers touch Player
  space.addCollisionHandler(1,2, collision, null, null, separate);
}

var GameLayer = cc.Layer.extend({
  init: function (multiplayer) {
    this._super(); // 1. super init first
    this.space = null;
    this._player = null;
    this._players = [];
    this._monsters = [];
    this._projectiles = [];
    this.initPhysics();
    setupAnimations(this);
    this.scoreLabel = ScoreLabel.getInstance(this, multiplayer);
    this.levelManager = LevelManager.getInstance(this, multiplayer);
    this.levelManager.setup(this);
    
    this.keyboardSetup(this.onKeyPressed, this.onKeyReleased);
    
    this.schedule(this.checkLevel, 1);
    this.schedule(this.update);
    this.addQuitMenuItem();
    if (multiplayer) {
      this.multiplayer = new Multiplayer(this);
    }
  },
  // init space of chipmunk
  initPhysics: function() {
    this.space = new cp.Space();
    this.space.gravity = cp.v(0, 0);

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
          if (target.hurt(projectile)) { // target hurt
            projectile.origin._targetsDestroyed++; // target dead
          }
          projectile.origin._shoots++;
          _layer.emitRemoveProjectile(projectile);
          projectile.autodestroy();
          projectile.origin.updateScoreLabel();
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
      _layer.emitNewPlayerProjectile();
      _layer.shoot(_layer, _layer._player, _layer._monsters);
    } else {
      _player.handleKey(e);
    }
  },
  shoot: function(context, origin, target, delay) {
    if (!target) {
      target = context._monsters;
    }
    var projectile = new ProjectileSprite(res.projectile);
    var func = function() {
      context._projectiles.push(projectile);
      projectile.run(context, origin, target);
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
    _layer.levelManager.reset();
    _layer.scoreLabel.reset();
    _layer._cleanUp();
    cc.director.runScene(new SysMenu());
  },
  keyboardSetup: function(onKeyPressed, onKeyReleased) {
    if (cc.sys.capabilities.hasOwnProperty('keyboard')) {
      cc.eventManager.addListener({
        event: cc.EventListener.KEYBOARD,
        onKeyPressed: onKeyPressed,
        onKeyReleased: onKeyReleased
      }, this);
    }
  },
  _cleanUp: function() {
    _layer.emitDisconnectPlayer();
    this.unscheduleAllCallbacks();
    this._player.unscheduleAllCallbacks();
    for (i = this._monsters.length - 1; i >= 0; i--) {
      this._monsters[i].unscheduleAllCallbacks();
    }
    try {
      this.player.removeFromParent();
    } catch(e) {}
    for (i = this._monsters.length - 1; i >= 0; i--) {
      try {
        this._monsters[i].removeFromParent();
      } catch(e) {}
    }
  },
  gameOver: function(won) {
    this._cleanUp();
    var message, nextLevel;
    this.scoreLabel.addHighscore(); // No more levels, save highscore
    if (won) {
      nextLevel = this.levelManager.nextLevel();
      if (nextLevel) {
        this.scoreLabel.backup(); // backup for more levels
      } else {
        this.scoreLabel.reset();
      }
    }
    if (!won || !nextLevel) {
      this.scoreLabel.reset();
      this.levelManager.reset();
      cc.director.runScene(new cc.TransitionFade(2, GameOver.newScene(won)));
    } else {
      message = this.levelManager.toString();
      cc.director.pushScene(new cc.TransitionFade(2, Message.newScene(message)));
    }
  },
  // *************//
  // EMIT MESSAGES//
  // *************//
  emitRemoveProjectile: function(projectile) {
    if (this.multiplayer) {
      this.multiplayer.emitRemoveProjectile(projectile);
    }
  },
  emitNewPlayerProjectile: function() {
    if (this.multiplayer) {
      this._player._shoots++;
      this.multiplayer.emitNewProjectile(true, this._player); // remote, origin
    }
  },
  emitDisconnectPlayer: function() {
    if (this.multiplayer) {
      this.multiplayer.emitDisconnectPlayer();
    }
  }
});

var _layer;
var Game = cc.Scene.extend({
  ctor: function(multiplayer) {
    this._super();
    this.multiplayer = multiplayer;
  },
  onEnter: function() {
    this._super();
    _layer = new GameLayer();
    this.addChild(_layer);
    _layer.init(this.multiplayer);
  }
});
