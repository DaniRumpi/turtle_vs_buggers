var monsterSprite = cc.Sprite.extend({
  _currentRotation: 0,
  _size: cc.director.getWinSize(),
  
  onEnter: function() {
    cc.log("Monster onEnter");
  },
  update: function (dt) {
    //this.move();
    //this.setRotation(this._currentRotation);
    if (!this.isClose()) {
      this.move();
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
  },
  handleRandomPoint: function (touchLocation) {
    this.aimX = parseInt(Math.random() * this._size.width);
    this.aimY = parseInt(Math.random() * this._size.height);
  },
  handleRandomMove:function(touchLocation){
    var angle = Math.atan2(this._aimX - this._size.width, this._aimY - this._size.height);

    angle = angle * (180/Math.PI);
    this._currentRotation = angle;
  },
  isClose: function() {
    var currLoc = this.getPosition();
    
  }
});