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
    preCacheExplosions(this);

    this.addPlayer();
    if (cc.sys.capabilities.hasOwnProperty('keyboard')) {
      cc.eventManager.addListener({
        event: cc.EventListener.KEYBOARD,
        onKeyPressed: this.onKeyPressed,
        onKeyReleased: this.onKeyReleased
      }, this);
    }
    this.schedule(this.update);
    // this.schedule(this.gameLogic, 3, 3);
    this.gameLogic();
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
      for (j = this._monsters.length - 1; j >= 0; j--) {
        monster = this._monsters[j];
        if (cc.pDistance(projectile._position, monster._position) <= monster._ratio) {
          this.addExplosion(monster._position);
          this._projectiles.splice(i, 1);
          this._monsters.splice(j, 1);
          projectile.removeFromParent();
          monster.destroy();
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
      _layer.shoot();
    } else {
      _player.handleKey(e);
    }
  },
  addPlayer: function() {
    _player = this._player = new PlayerSprite(res.mainPlayer);
    this._player.setup(this.space);
    this.addChild(this._player, 0);
  },
  addMonster: function() {
    _monster = this._monster = new MonsterSprite(res.bugger);
    this._monster.setup(this.space);
    this._monsters.push(_monster);
    this.addChild(this._monster, 1);
  },
  shoot: function() {
    var projectile = new ProjectileSprite(res.projectile);
    projectile.run(_layer, _player);
    _layer._projectiles.push(projectile);
    _layer.addChild(projectile, 2);
  },
  addExplosion: function (position) {
    var explosion = new Explosion();
    this.addChild(explosion, 3);
    explosion.play(position);
  },
  gameLogic: function(dt) {
    this.addMonster();
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
