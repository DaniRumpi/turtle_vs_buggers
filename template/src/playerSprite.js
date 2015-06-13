var PlayerSprite = cc.PhysicsSprite.extend({
  _monstersDestroyed: 0,
  setup: function(space) {
    this.scale = 0.5;
    this.position = cc.p(_size.width/2, _size.height/2);
    this.$width = this.width * this.scale;
    this.$height = this.height * this.scale;
    this.$body = new cp.Body(1, cp.momentForBox(1, this.$width, this.$height));
    this.$body.p = this.position;
    this.$shape = new cp.BoxShape(this.$body, this.$width -10, this.$height);
    this.$shape.setCollisionType(1);
    space.addBody(this.$body);
    space.addShape(this.$shape);
    this.setBody(this.$body);

    this.setPosition(this.position);
    this.setRandomRotation();
    this.scheduleUpdate();
  },
  update: function (dt) {
    this.move();
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
  },
  move: function () {
    if (this._key_left && !this._key_right) {
      this.rotation -= 2;
    }
    else if (this._key_right && !this._key_left) {
      this.rotation += 2;
    }

    if (this.rotation < 0) { this.rotation = 360; }
    if (this.rotation > 360) { this.rotation = 0; }

    if (this._key_up || this._key_down) {
      var x, y;
      if (this._key_up && !this._key_down) {
        x = 0;
        y = 2;
      }
      else if (this._key_down && !this._key_up) {
        x = 0;
        y = -1;
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