var playerSprite = cc.Sprite.extend({
  _currentRotation: 0,
  _key_up: false,
  _key_left: false,
  _key_right: false,
  _key_down: false,
  update: function (dt) {
    this.move();
    this.setRotation(this._currentRotation);
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
      this._currentRotation -= 4;
    }
    else if (this._key_right && !this._key_left) {
      this._currentRotation += 4;
    }

    if (this._currentRotation < 0) { this._currentRotation = 360; }
    if (this._currentRotation > 360) { this._currentRotation = 0; }

    if (this._key_up || this._key_down) {
      var angle, x, y, x2, y2;
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
      angle = this._currentRotation * Math.PI / 180; // radians
      x2 = - y * Math.sin(-angle);
      y2 = y * Math.cos(-angle);
      this.runAction(cc.MoveBy.create(0, cc.p(x2, y2)));
      this.runAction(cc.MoveBy.create(0, cc.p(x2, y2)));
    }
  }
});