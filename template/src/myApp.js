function addWallsAndGround(space) {
  leftWall = new cp.SegmentShape(space.staticBody, new cp.v(0, 0), new cp.v(0, _size.height), WALLS_WIDTH);
  leftWall.setElasticity(WALLS_ELASTICITY);
  leftWall.setFriction(WALLS_FRICTION);
  space.addStaticShape(leftWall);

  rightWall = new cp.SegmentShape(space.staticBody, new cp.v(_size.width, _size.height), new cp.v(_size.width, 0), WALLS_WIDTH);
  rightWall.setElasticity(WALLS_ELASTICITY);
  rightWall.setFriction(WALLS_FRICTION);
  space.addStaticShape(rightWall);

  bottomWall = new cp.SegmentShape(space.staticBody, new cp.v(0, 0), new cp.v(_size.width, 0), WALLS_WIDTH);
  bottomWall.setElasticity(WALLS_ELASTICITY);
  bottomWall.setFriction(WALLS_FRICTION);
  space.addStaticShape(bottomWall);

  upperWall = new cp.SegmentShape(space.staticBody, new cp.v(0, _size.height), new cp.v(_size.width, _size.height), WALLS_WIDTH);
  upperWall.setElasticity(WALLS_ELASTICITY);
  upperWall.setFriction(WALLS_FRICTION);
  space.addStaticShape(upperWall);
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

    this.gameLogic();
    this.addPlayer();
    _shoot = this.shoot;
    
    
    // Explosions
    // cc.spriteFrameCache.addSpriteFrames(res.explosion_plist);
    // var explosionTexture = cc.textureCache.addImage(res.explosion_png);
    // // Adds a sprite batch node.
    // this._explosions = new cc.SpriteBatchNode(explosionTexture);
    // this._explosions.setBlendFunc(cc.SRC_ALPHA, cc.ONE);
    // // Adds spriteSheet in this layer.
    // this.addChild(this._explosions, 5);
    // this.sharedExplosion();
    // this.preSetExplosion();
    // this.playExplosions();
    
    preCacheExplosions(this);

    if (cc.sys.capabilities.hasOwnProperty('keyboard')) {
      cc.eventManager.addListener({
        event: cc.EventListener.KEYBOARD,
        onKeyPressed: this.onKeyPressed,
        onKeyReleased: this.onKeyReleased
      }, this);
    }
    this.schedule(this.update);
  },
  // init space of chipmunk
  initPhysics: function() {
    this.space = new cp.Space();
    this.space.gravity = cp.v(0, 0);
    addWallsAndGround(this.space);
  },
  update: function (dt) {
    this.space.step(dt);
    // collision
    var i, j, projectile, monster, projectileP, monsterP;
    for (i = this._projectiles.length - 1; i >= 0; i--) {
      projectile = this._projectiles[i];
      for (j = this._monsters.length - 1; j >= 0; j--) {
        monster = this._monsters[j];
        projectileP = projectile._position;
        monsterP = monster._position;
        if (cc.pDistance(projectileP, monsterP) <= monster._ratio) {
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
    this._player.setup(this.space);
    this.addChild(this._player, 0);
    // this.sprite = new cc.PhysicsSprite(res.mainPlayer);
    // var contentSize = this.sprite.getContentSize();
    // this.body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
    // this.body.p = cc.p(200, 200);
    // this.body.applyImpulse(cp.v(100, 0), cp.v(0, 0));
    // this.space.addBody(this.body);
    // //6. create the shape for the body
    // this.shape = new cp.BoxShape(this.body, contentSize.width - 14, contentSize.height);
    // //7. add shape to space
    // this.space.addShape(this.shape);
    // //8. set body to the physic sprite
    // this.sprite.setBody(this.body);
    // this.addChild(this.sprite);
  },
  addMonster: function() {
    _monster = this._monster = new MonsterSprite(res.bugger);
    this._monster.setup(this.space);
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
  addExplosions: function (explosion) {
    this.addChild(explosion, 3);
  },
  sharedExplosion: function () {
    var animFrames = [];
    var str = '';
    for (var i = 1; i < 35; i++) {
      str = 'explosion_' + (i < 10 ? ('0' + i) : i) + '.png';
      var frame = cc.spriteFrameCache.getSpriteFrame(str);
      animFrames.push(frame);
    }
    var animation = new cc.Animation(animFrames, 0.04);
    cc.animationCache.addAnimation(animation, 'Explosion');
  },
  // createExplosion: function () {
  //   var explosion = new Explosion();
  //   _layer.addExplosions(explosion);
  //   EXPLOSIONS.push(explosion);
  //   return explosion;
  // },
  preSetExplosion: function () {
    var explosion = null, i;
    for (i = 5; i >= 0; i--) {
      explosion = new Explosion();
      EXPLOSIONS.push(explosion);
    }
  },
  playExplosions: function () {
    for (i = 5; i >= 0; i--) {
      _layer.addChild(EXPLOSIONS[i]);
      EXPLOSIONS[i].play();
    }
  }
});

var _layer;
var MyScene = cc.Scene.extend({
  onEnter:function () {
    this._super();
    _layer = new MyLayer();
    this.addChild(_layer);
    _layer.init();
    var colorLayer = new cc.LayerColor(cc.color(0,0,0), _size.width, _size.height);
    this.addChild(colorLayer, -1);
  }
});
