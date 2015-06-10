var MonsterSprite = cc.Sprite.extend({
  _currentRotation: 0,
  moving: false,
  speed: 70.0,
  _key_right: false,
  _key_down: false,
  onEnter: function() {
    this._super();
    this.setScale(0.4);
    this.setPosition(cc.p(_size.width/2, _size.height/2));
    this._ratio = this.getContentSize().width * this.getScale() / 2.3;
    this.scheduleUpdate();
  },
  update: function (dt) {
    if (!this.moving) {
      this.getAim();
      this.setRotationAim();
      this.move();
    }
  },
  getAim: function() {
    this._aimX = parseInt(Math.random() * _size.width);
    this._aimY = parseInt(Math.random() * _size.height);
  },
  setRotationAim: function() {
    var pos = this._position;
    var angle = Math.atan2(this._aimX - pos.x, this._aimY - pos.y);
    this.rotation = cc.radiansToDegrees(angle);
  },
  move: function () {
    this.moving = true;
    var pos = this._position;
    var aim = cc.p(this._aimX, this._aimY);
    var dist = cc.pDistance(aim, pos);
    var time = dist / this.speed;
    var actionMove = cc.MoveTo.create(time, aim);
    var actionMoveDone = cc.CallFunc.create(function(node) {
      this.moving = false;
    }, this);
    this.runAction(cc.Sequence.create(actionMove, actionMoveDone));
  }
});
