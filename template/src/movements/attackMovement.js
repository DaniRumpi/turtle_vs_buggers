AttackMovement = function(obj) {
  this.obj = obj;
};
AttackMovement.prototype.setAim = function () {
  this._aimX = parseInt(cc.random0To1() * (_size.width - this.obj.$width)) + this.obj.$width / 2;
  this._aimY = parseInt(cc.random0To1() * (_size.height - this.obj.$height)) + this.obj.$height / 2;
};
AttackMovement.prototype.setRotationAim = function () {
  var pos = this.obj.position;
  var angle = Math.atan2(this._aimX - pos.x, this._aimY - pos.y);
  this.obj.rotation = cc.radiansToDegrees(angle);
};
AttackMovement.prototype.getRotationAim = function () {
  var pos = this.obj.position;
  var angle = Math.atan2(this._aimX - pos.x, this._aimY - pos.y);
  return cc.radiansToDegrees(angle);
};
AttackMovement.prototype.walk = function () {
  this.setAim();
  
  var pos = this.obj.position;
  var aim = cc.p(this._aimX, this._aimY);
  var dist = cc.pDistance(aim, pos);
  
  if (dist < 200) { // Follow
    pAim = cc.p(0, dist);
    pRot = cc.pRotateByAngle(pAim, cc.p(), -cc.degreesToRadians(this.obj.rotation));
    time = dist / (this.obj._speed * 1.2);
    actionMove = cc.MoveBy.create(time, pRot);
    
    var actionMoveDone = cc.CallFunc.create(function(node) {
      node && node.update();
    }, this.obj);
    this.obj.runAction(cc.Sequence.create(actionMove, actionMoveDone));
  } else { // Random Walk
    
  }
};