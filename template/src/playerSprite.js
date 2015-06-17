var PlayerSprite = cc.PhysicsSprite.extend({
  _hurt: 0,
  _health: 0,
  _targetsDestroyed: 0,
  _power: 1,
  _speed: 2,
  ctor: function (name) {
    var pFrame = cc.spriteFrameCache.getSpriteFrame(name+'1.png');
    this._super(pFrame);
    this.animation = cc.animationCache.getAnimation(name);
  },
  setup: function(space, config) {
    this.scale = config.scale || 1;
    this._health += config.health;
    this._power = config.power;
    this._speed = config.speed;
    this._colorExplosion = config.colorExplosion;
    this._colorShoot = config.colorShoot;

    this.position = cc.p(_size.width/2, _size.height/2);
    this.$width = this.width * this.scale;
    this.$height = this.height * this.scale;
    this._ratio = this.$width / 2.3;
    this.$body = new cp.Body(1, cp.momentForBox(1, this.$width, this.$height));
    this.$body.p = this.position;
    this.$shape = new cp.BoxShape(this.$body, this.$width -10, this.$height);
    this.$shape.setCollisionType(1);
    space.addBody(this.$body);
    space.addShape(this.$shape);
    this.setBody(this.$body);

    this.setPosition(this.position);
    this.setRandomRotation();
    this._color = this.color;
    this._colorHurt = cc.color(255,150,150);
    
    this.runningAction = new cc.RepeatForever(new cc.Animate(this.animation));
    this.scheduleUpdate();
    this.addHealthLevel();
  },
  play: function() {
    if (!this._playing) {
      this.runAction(this.runningAction);
      this._playing = true;
    }
  },
  stop: function() {
    if (this._playing) {
      this.stopAction(this.runningAction);
      this._playing = false;
    }
  },
  update: function (dt) {
    if (this._hurt) {
      --this._health;
      this.updateHealthLabel();
    }
    if (!this._health || this._health <= 0) {
      _layer.gameOver();
    }
    this.move();
  },
  hurt: function(power) {
    this._health -= power || 1;
    this.updateHealthLabel();
  },
  collision: function(something, something2) {
    _player._hurt = 1;
    _player.color = _player._colorHurt;
    return true;
  },
  separate: function(something, something2) {
    _player._hurt = 0;
    _player.color = _player._color;
    return true;
  },
  addHealthLevel: function() {
    this._label = "||||||||||||||||||||";
    this.label = cc.LabelTTF.create(this._label, "Helvetica Neue", 20);
    this.label.setColor(cc.color(255,255,255));
    this.label.setPosition(_size.width - 70, _size.height - 20);
    _layer.addChild(this.label);
  },
  updateHealthLabel: function() {
    var levelBar;
    if (this._health >= 100) {
      levelBar = this._label;
    } else {
      var levelHealth = parseInt(this._health/5);
      levelBar = (this._label.split("").slice(0, levelHealth)).join("");
    }
    this.label.setString(levelBar);
  },
  handleKey: function(e, val) {
    if (e === cc.KEY.left) {
      this._key_left = val;
    }
    else if (e === cc.KEY.right) {
      this._key_right = val;
    }
    else if (e === cc.KEY.up) {
      this._key_up = val;
    }
    else if (e === cc.KEY.down) {
      this._key_down = val;
    }
    if (!this._key_left && !this._key_right && !this._key_up && !this._key_down) {
      this.stop();
    } else {
      this.play();
    }
  },
  move: function () {
    if (this._key_left && !this._key_right) {
      this.rotation -= this._speed;
    }
    else if (this._key_right && !this._key_left) {
      this.rotation += this._speed;
    }

    if (this.rotation < 0) { this.rotation = 360; }
    if (this.rotation > 360) { this.rotation = 0; }

    if (this._key_up || this._key_down) {
      var x, y;
      if (this._key_up && !this._key_down) {
        x = 0;
        y = this._speed;
      }
      else if (this._key_down && !this._key_up) {
        x = 0;
        y = -this._speed;
      } else {
        return;
      }
      var pRot = cc.pRotateByAngle(cc.p(x, y), cc.p(), -cc.degreesToRadians(this.rotation));
      this.setPosition(cc.pAdd(this._position, pRot));
    }
  },
  setRandomRotation: function() {
    this.rotation = parseInt(cc.random0To1() * 360);
  }
});