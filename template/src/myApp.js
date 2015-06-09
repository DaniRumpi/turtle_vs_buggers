
var MyLayer = cc.Layer.extend({
  sprite:null,
  _player: null,
  _monsters: [],
  _projectiles:[],
  init:function () {
    // 1. super init first
    this._super();

    var size = cc.director.getWinSize();
    this.size = size;
    window._size = size;
    
    this.gameLogic();
    this.addPlayer();

    if (cc.sys.capabilities.hasOwnProperty('keyboard')) {
      cc.eventManager.addListener({
        event: cc.EventListener.KEYBOARD,
        onKeyPressed: this.onKeyPressed,
        onKeyReleased: this.onKeyReleased
      }, this);
    }
    
    _shoot = this.shoot;
    this.schedule(this.update);
  },
  collision: function(dt) {
    // cc.log("Update!");
    this.collision(dt);
  },
  update: function (dt) {
    // cc.log("Update!");
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
          // cc.ArrayRemoveObject(this._projectiles, projectile);
          projectile.removeFromParent();
          this._projectiles.splice(i, 1);
          // cc.ArrayRemoveObject(this._monsters, monster);
          // monster.removeFromParent();
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
    if (e === cc.KEY.space && _player) {
      _shoot(_layer, _player.getPosition(), _player.getCurrentRotation());
    } else {
      _player.handleKey(e);
    }
  },
  addPlayer: function() {
    this._player = new PlayerSprite(res.mainPlayer);
    this.setPosition(new cc.Point(0,0));
    this._player.setScale(0.5);
    this.addChild(this._player, 0);
    this._player.setPosition(new cc.Point(this.size.width/2, this.size.height/2));
    _player = this._player;
    this._player.scheduleUpdate();
  },
  addMonster: function() {
    this._monster = new MonsterSprite(res.bugger);
    this.setPosition(new cc.Point(0,0));
    this._monster.setScale(0.4);
    this.addChild(this._monster, 0);
    this._monster.setPosition(new cc.Point(this.size.width/2, this.size.height/2));
    _monster = this._monster;
    this._monsters.push(_monster);
    this._monster.scheduleUpdate();
  },
  gameLogic: function(dt) {
    this.addMonster();
  },
  shoot: function(context, origin, angle) {
    // Set up initial location of the projectile
    var projectile = cc.Sprite.create(res.projectile);
    projectile.setPosition(origin.x, origin.y);
    projectile.setRotation(angle);
 
    context.addChild(projectile);
 
    var x, y;
    x = 0;
    y = _size.width;
    
    var rad = angle * Math.PI / 180;
    var aimX = - y * Math.sin(-rad);
    var aimY = y * Math.cos(-rad);
    var aim = cc.p(aimX, aimY);

    // Move projectile to actual endpoint
    projectile.runAction(cc.Sequence.create(
      cc.MoveBy.create(1, aim),
      cc.CallFunc.create(function(node) {
        var index = context._projectiles.indexOf(node);
        context._projectiles.splice(index, 1);
        // cc.log(index, context._projectiles);
      }, this),
      cc.RemoveSelf.create(true)
    ));
 
    // Add to array
    projectile.setTag(2);
    context._projectiles.push(projectile);
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
