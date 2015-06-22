var MonsterSprite = cc.PhysicsSprite.extend({
  _power: 1,
  _targetsDestroyed: 0,
  _health: 1,
  ctor: function (_default, config) {
    if (!config) {
      config = {};
    }
    this._super(_default.sprite);
    this.scale = _default.scale;
    this._power = _default.power;
    this._speed = config.speed || _default.speed;
    this._colorExplosion = _default.colorExplosion;
    this._colorShoot = _default.colorShoot;
    this._remote = config.remote;
    if (config.health === undefined) {
      this._health = _default.health;
    } else {
      this._health = config.health;
    }
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
    if (config.moveType) {
      this.configMovement(config);
    } else {
      this.configMovement(_default);
    }
    if (_default.showTime) {
      var monster = this;
      _layer.scheduleOnce(function() {
        _layer.addChild(monster, 1);
        !config.remote && monster.update();
        _layer.addExplosion(EXPLOSION_YELLOW, monster.position, 0, monster._colorExplosion);
      }, _default.showTime);
    } else {
      _layer.addChild(this, 1);
      !config.remote && this.update();
      _layer.addExplosion(EXPLOSION_YELLOW, this.position, 0, this._colorExplosion);
    }
    if (config.aimX !== undefined) {
      this.setup(config);
    }
  },
  update: function(dt) {
    this.move.walk();
  },
  setup: function(data) {
    var walk = false;
    if ((this._aimX !== data.aimX) || (this._aimY !== data.aimY)) {
      walk = true;
    }
    if (walk) {
      this.stopAllActions();
      this.setPosition(cc.p(data.x, data.y));
      this._aimX = data.aimX;
      this._aimY = data.aimY;
      this.move.walk();
    }
  },
  hurt: function(projectile) {
    --this._health;
    if (!this._health) {
      this.emitRemoveMonster(projectile);
      this.destroy();
      return true;
    }
    this.emitHurtMonster(projectile);
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
    if (this._remote) {
      if (config.moveType === RANDOM_MOVE) {
        this.move = new RemoteMovement(this);
      } else if (config.moveType === FOLLOW_MOVE) {
        this.move = new RemoteMovement(this);
      } else if (config.moveType === ATTACK_MOVE) {
        this.move = new RemoteMovement(this);
      }
    } else {
      if (config.moveType === RANDOM_MOVE) {
        this.move = new RandomMovement(this);
      } else if (config.moveType === FOLLOW_MOVE) {
        this.move = new FollowMovement(this);
      } else if (config.moveType === ATTACK_MOVE) {
        this.move = new AttackMovement(this);
      }
    }
  },
  // *************//
  // EMIT MESSAGES//
  // *************//
  emitRemoveMonster: function() {
    if (_layer.multiplayer) {
      _layer.multiplayer.emitRemoveMonster({id: this.id});
    }
  },
  emitHurtMonster: function() {
    if (_layer.multiplayer) {
      _layer.multiplayer.emitHurtMonster({id: this.id});
    }
  }
});
