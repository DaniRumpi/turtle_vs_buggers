var PlayerSprite = cc.Sprite.extend({
  _currentRotation: 0,
  update: function (dt) {
    this.move();
    this.setRotation(this._currentRotation);
  },
  handleKey: function(e) {
    if (e === cc.KEY.space) {
      this._key_space = val;
    }
  },
  move: function () {
    
  }
});