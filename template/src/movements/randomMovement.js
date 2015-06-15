RandomMovement = function(obj) {
  this.obj = obj;
};
RandomMovement.prototype.setAim = function () {
  this._aimX = parseInt(cc.random0To1() * (_size.width - this.obj.$width)) + this.obj.$width / 2;
  this._aimY = parseInt(cc.random0To1() * (_size.height - this.obj.$height)) + this.obj.$height / 2;
},
RandomMovement.prototype.setRotationAim = function () {
  var pos = this.obj.position;
  var angle = Math.atan2(this._aimX - pos.x, this._aimY - pos.y);
  this.obj.rotation = cc.radiansToDegrees(angle);
};
RandomMovement.prototype.walk = function () {
  this.setAim();
  
  var pos = this.obj.position;
  var aim = cc.p(this._aimX, this._aimY);
  var dist = cc.pDistance(aim, pos);
  var time = dist / this.obj._speed;

  var actionMove = cc.MoveTo.create(time, aim);
  var actionMoveDone = cc.CallFunc.create(function(node) {
    node && node.update();
  }, this.obj);
  
  this.setRotationAim();
  this.obj.runAction(cc.Sequence.create(actionMove, actionMoveDone));
};