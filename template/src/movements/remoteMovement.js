RemoteMovement = function (obj) {
  this.obj = obj;
};
RemoteMovement.prototype.setRotationAim = function () {
  var pos = this.obj.position;
  var angle = Math.atan2(this.obj._aimX - pos.x, this.obj._aimY - pos.y);
  this.obj.rotation = cc.radiansToDegrees(angle);
};
RemoteMovement.prototype.walk = function () {
  var pos = this.obj.position;
  var aim = cc.p(this.obj._aimX, this.obj._aimY);
  var dist = cc.pDistance(aim, pos);
  var time = dist / this.obj._speed;

  var actionMove = cc.MoveTo.create(time, aim);
  
  this.setRotationAim();
  this.obj.runAction(actionMove);
};