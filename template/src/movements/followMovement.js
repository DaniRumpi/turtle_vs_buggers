FollowMovement = function (obj) {
  this.obj = obj;
};
FollowMovement.prototype.setAim = function () {
  this._aimX = _layer._player.position.x;
  this._aimY = _layer._player.position.y;
},
FollowMovement.prototype.setRotationAim = function () {
  var pos = this.obj.position;
  var angle = Math.atan2(this._aimX - pos.x, this._aimY - pos.y);
  this.obj.rotation = cc.radiansToDegrees(angle) || 0;
};
FollowMovement.prototype.walk = function () {
  this.setRotationAim();
  var pos = this.obj.position;
  var pTarget = cc.p(this._aimX, this._aimY);
  var realDist = cc.pDistance(pos, pTarget);
  var dist = realDist * cc.random0To1() / 3;
  var pAim, pRot, time, actionMove;
  if (dist < 30) {
    time = realDist / (this.obj._speed * 1.2);
    actionMove = cc.MoveTo.create(time, pTarget);
  } else {
    pAim = cc.p(0, dist);
    pRot = cc.pRotateByAngle(pAim, cc.p(), -cc.degreesToRadians(this.obj.rotation));
    time = dist / (this.obj._speed * 1.2);
    actionMove = cc.MoveBy.create(time, pRot);
  }
  var actionMoveDone = cc.CallFunc.create(function(node) {
    node && node.update();
  }, this.obj);
  this.obj.runAction(cc.Sequence.create(actionMove, actionMoveDone));
};