RandomMovementRemote = function (obj) {
  this.obj = obj;
};
RandomMovementRemote.prototype.setRotationAim = function () {
  var pos = this.obj.position;
  var angle = Math.atan2(this.obj._aimX - pos.x, this.obj._aimY - pos.y);
  this.obj.rotation = cc.radiansToDegrees(angle);
};
RandomMovementRemote.prototype.walk = function () {
  var pos = this.obj.position;
  console.log("pos::", pos);
  var aim = cc.p(this.obj._aimX, this.obj._aimY);
  console.log("aim::", aim);
  var dist = cc.pDistance(aim, pos);
  console.log("dist::", dist);
  var time = dist / this.obj._speed;
  console.log("time::", time, this.obj._speed);

  var actionMove = cc.MoveTo.create(time, aim);
  
  this.setRotationAim();
  this.obj.runAction(actionMove);
};