var MonsterSprite = cc.PhysicsSprite.extend({
  _speed: 70,
  _power: 1,
  _targetsDestroyed: 0,
  _health: 1,
  ctor: function (_default, config) {
    this._super(_default.sprite);
    this.scale = _default.scale || 1;
    this._power = _default.power;
    this._speed = _default.speed;
    this._health = _default.health;
    this._colorExplosion = _default.colorExplosion;
    this._colorShoot = _default.colorShoot;
    
    this.$width = this.width * this.scale;
    this.$height = this.height * this.scale;
    this.setRandomPosition(config);
    this.$body = new cp.Body(1, cp.momentForBox(1, this.$width, this.$height));
    this.$body.p = this.position;
    this.$shape = new cp.BoxShape(this.$body, this.$width -16, this.$height);
    this.$shape.setCollisionType(2);
    _layer.space.addBody(this.$body);
    _layer.space.addShape(this.$shape);
    this.setBody(this.$body);

    this._color = this.color;
    this.setPosition(this.position);
    this._ratio = this.$width / 2.3;
    // Create Movement
    this.configMovement(_default);
    
    if (config.showTime) {
      var monster = this;
      this.scheduleOnce(function() {
        _layer.addChild(monster, 1);
        monster.update();
        _layer.addExplosion(EXPLOSION_YELLOW, monster.position, 0, monster._colorExplosion);
      }, config.showTime);
    } else {
      _layer.addChild(this, 1);
      this.update();
      _layer.addExplosion(EXPLOSION_YELLOW, this.position, 0, this._colorExplosion);
    }
  },
  update: function(dt) {
    this.move.walk();
  },
  hurt: function(power) {
    --this._health;
    if (!this._health) {
      this.destroy();
      return true;
    }
    return false;
  },
  destroy: function() {
    _layer._monsters.splice(_layer._monsters.indexOf(this), 1);
    this.visible = false;
    this.stopAllActions();
    try {
      _layer.space.removeShape(this.$shape);
      _layer.space.removeBody(this.$body);
      this.removeAllChildrenWithCleanup();
      this.removeFromParent();
    } catch(e) {}
  },
  setRandomPosition: function(config) {
    if (config.x !== undefined) {
      this.position = cc.p(config.x, config.y);
      return;
    }
    var _posX, _posY, _pos, _middle;
    _middle = cc.p(_size.width/2, _size.height/2);
    while (true) {
      _posX = parseInt(cc.random0To1() * (_size.width - this.$width)) + this.$width / 2;
      _posY = parseInt(cc.random0To1() * (_size.height - this.$height)) + this.$height / 2;
      _pos = cc.p(_posX, _posY);
      if (cc.pDistance(_pos, _middle) > 100) {
        break;
      }
    }
    this.position = _pos;
  },
  configMovement: function(config) {
    if (config.moveType === RANDOM_MOVE) {
      this.move = new RandomMovement(this);
    } else if (config.moveType === FOLLOW_MOVE) {
      this.move = new FollowMovement(this);
    } else if (config.moveType === ATTACK_MOVE) {
      this.move = new AttackMovement(this);
    }
  }
});
