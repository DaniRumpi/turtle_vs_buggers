var MonsterSprite = cc.PhysicsSprite.extend({
  _speed: 70,
  _power: 1,
  _targetsDestroyed: 0,
  _health: 1,
  setup: function(space, config) {
    this.scale = config.scale || 1;
    this._power = config.power;
    this._speed = config.speed;
    this._health = config.health;
    
    this.$width = this.width * this.scale;
    this.$height = this.height * this.scale;
    this.setRandomPosition();
    this.$body = new cp.Body(1, cp.momentForBox(1, this.$width, this.$height));
    this.$body.p = this.position;
    this.$shape = new cp.BoxShape(this.$body, this.$width -16, this.$height);
    this.$shape.setCollisionType(2);
    space.addBody(this.$body);
    space.addShape(this.$shape);
    this.setBody(this.$body);

    this._color = this.color;
    this.setPosition(this.position);
    this._ratio = this.$width / 2.3;
    // Create Movement
    this.configMovement(config);
    // this.update();
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
  setRandomPosition: function() {
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
