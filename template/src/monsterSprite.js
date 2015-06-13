var MonsterSprite = cc.PhysicsSprite.extend({
  moving: false,
  speed: 70.0,
  scale: 0.4,
  setup: function(space) {
    this.position = cc.p(_size.width/2, _size.height/2);
    this.$width = this.width * this.scale;
    this.$height = this.height * this.scale;
    this.$body = new cp.Body(1, cp.momentForBox(1, this.$width, this.$height));
    this.$body.p = this.position;
    this.$shape = new cp.BoxShape(this.$body, this.$width -16, this.$height);
    space.addBody(this.$body);
    space.addShape(this.$shape);
    this.setBody(this.$body);

    this.setPosition(this.position);
    this._ratio = this.$width / 2.3;
    this.scheduleUpdate();
  },
  update: function(dt) {
    if (!this.moving) {
      this.getAim();
      this.setRotationAim();
      this.move();
    }
  },
  destroy: function() {
    this.stopAllActions();
    this.removeAllChildrenWithCleanup();
    this.removeFromParent();
    _layer.space.removeShape(this.$shape);
    _layer.space.removeBody(this.$body);
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
