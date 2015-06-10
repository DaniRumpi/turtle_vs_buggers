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
        projectileP = projectile.getPosition();
        monsterP = monster.getPosition();
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
    // cc.log(e);
    if (e === cc.KEY.space) {
      _shoot(_layer, _player.getPosition(), _player.getRotation());
    } else {
      _player.handleKey(e);
    }
  },
  addPlayer: function() {
    _player = this._player = new PlayerSprite(res.mainPlayer);
    this.addChild(this._player, 0);
  },
  addMonster: function() {
    _monster= this._monster = new MonsterSprite(res.bugger);
    this._monsters.push(_monster);
    this.addChild(this._monster, 1);
  },
  gameLogic: function(dt) {
    this.addMonster();
  },
  shoot: function(context, origin, angle) {
    // Set up initial location of the projectile
    var projectile = cc.Sprite.create(res.projectile);
    projectile.setPosition(origin.x, origin.y);
    projectile.setRotation(angle);
 
    var x = 0, y = _size.width;
    var aim = cc.pRotateByAngle(cc.p(x, y), cc.p(), -cc.degreesToRadians(angle));

    // Move projectile to actual endpoint
    projectile.runAction(cc.Sequence.create(
      cc.MoveBy.create(1, aim),
      cc.CallFunc.create(function(node) {
        var index = context._projectiles.indexOf(node);
        context._projectiles.splice(index, 1);
      }, this),
      cc.RemoveSelf.create(true)
    ));
 
    // Add to array
    projectile.setTag(2);
    context._projectiles.push(projectile);
    context.addChild(projectile, 2);
  },
});

var _layer;
var MyScene = cc.Scene.extend({
  onEnter:function () {
    this._super();
    _layer = new MyLayer();
    this.addChild(_layer);
    _layer.init();
  }
});
