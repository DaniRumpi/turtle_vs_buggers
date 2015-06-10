var PlayerSprite = cc.Sprite.extend({
  _key_up: false,
  _key_left: false,
  _key_right: false,
  _key_down: false,
  onEnter: function() {
    this._super();
    this.setPosition(cc.p(_size.width/2, _size.height/2));
    this.setScale(0.5);
    this.scheduleUpdate();
  },
  update: function (dt) {
    this.move();
    // this.setRotation(this.rotation);
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
        y = -0.8;
      } else {
        return;
      }
      // angle = this.rotation * Math.PI / 180; // radians
      // x2 = - y * Math.sin(-angle);
      // y2 = y * Math.cos(-angle);
      var pRot = cc.pRotateByAngle(cc.p(x, y), cc.p(), -cc.degreesToRadians(this.rotation));
      this.runAction(cc.MoveBy.create(0, pRot));
      this.runAction(cc.MoveBy.create(0, pRot));
    }
  }
});