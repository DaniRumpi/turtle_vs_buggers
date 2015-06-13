var MonsterSprite = cc.PhysicsSprite.extend({
  speed: 70.0,
  setup: function(space) {
    this.scale = 0.4;
    this.setRandomPosition();
    this.$width = this.width * this.scale;
    this.$height = this.height * this.scale;
    this.$body = new cp.Body(1, cp.momentForBox(1, this.$width, this.$height));
    this.$body.p = this.position;
    this.$shape = new cp.BoxShape(this.$body, this.$width -16, this.$height);
    this.$shape.setCollisionType(2);
    space.addBody(this.$body);
    space.addShape(this.$shape);
    this.setBody(this.$body);

    this.setPosition(this.position);
    this._ratio = this.$width / 2.3;
    this.scheduleOnce(this.update);
  },
  update: function(dt) {
      this.getAim();
      this.setRotationAim();
      this.move();
  },
  destroy: function() {
    this.stopAllActions();
    this.removeAllChildrenWithCleanup();
    this.removeFromParent();
    _layer.space.removeShape(this.$shape);
    _layer.space.removeBody(this.$body);
  },
  setRandomPosition: function() {
    var _posX, _posY, _pos, _middle;
    _middle = cc.p(_size.width/2, _size.height/2);
    while (true) {
      _posX = parseInt(cc.random0To1() * _size.width);
      _posY = parseInt(cc.random0To1() * _size.height);
      _pos = cc.p(_posX, _posY);
      if (cc.pDistance(_pos, _middle) > 150) {
        break;
      }
    }
    this.position = _pos;
  },
  getAim: function() {
    this._aimX = parseInt(cc.random0To1() * _size.width);
    this._aimY = parseInt(cc.random0To1() * _size.height);
  },
  setRotationAim: function() {
    var pos = this.position;
    var angle = Math.atan2(this._aimX - pos.x, this._aimY - pos.y);
    this.rotation = cc.radiansToDegrees(angle);
  },
  move: function () {
    var pos = this.position;
    var aim = cc.p(this._aimX, this._aimY);
    var dist = cc.pDistance(aim, pos);
    var time = dist / this.speed;
    var actionMove = cc.MoveTo.create(time, aim);
    var actionMoveDone = cc.CallFunc.create(function(node) {
      this.update();
    }, this);
    this.runAction(cc.Sequence.create(actionMove, actionMoveDone));
  },
  run: function() {
    var actionUpdate = cc.CallFunc.create(function(node) {
      node.update();
    }, this);
    var actionMove = cc.MoveTo.create(this._time, this._aim);
    var sequence = cc.Sequence.create(actionMove, actionUpdate);
    this.runAction(cc.RepeatForever.create(sequence));
  }
});
