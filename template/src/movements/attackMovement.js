AttackMovement = function(obj) {
  this.obj = obj;
};
AttackMovement.prototype.setRandomAim = function () {
  this._aimX = parseInt(cc.random0To1() * (_size.width - this.obj.$width)) + this.obj.$width / 2;
  this._aimY = parseInt(cc.random0To1() * (_size.height - this.obj.$height)) + this.obj.$height / 2;
};
AttackMovement.prototype.setAim = function () {
  this._aimX = _layer._player.position.x;
  this._aimY = _layer._player.position.y;
};
AttackMovement.prototype.setRotationAim = function () {
  var pos = this.obj.position;
  var angle = Math.atan2(this._aimX - pos.x, this._aimY - pos.y);
  this.obj.rotation = cc.radiansToDegrees(angle) + parseInt(Math.random() * 10 - 5);
};
AttackMovement.prototype.walk = function () {
  this.setAim();
  
  var pos = this.obj.position;
  var aim = cc.p(this._aimX, this._aimY);
  var dist = cc.pDistance(aim, pos);
  
  var actionMove, actionMoveDone;
  if (dist < 300) { // Follow
    this.setRotationAim();
    this.shoot(Math.random());
    pAim = cc.p(0, dist);
    pRot = cc.pRotateByAngle(pAim, cc.p(), -cc.degreesToRadians(this.obj.rotation));
    time = dist / (this.obj._speed);
    actionMove = cc.MoveBy.create(time, pRot);
    
    actionMoveDone = cc.CallFunc.create(function(node) {
      node && node.update();
    }, this.obj);
    this.obj.runAction(cc.Sequence.create(actionMove, actionMoveDone));
  } else { // Random Walk
    this.setRandomAim();
    this.setRotationAim();
    this.shoot();
    
    aim = cc.p(this._aimX, this._aimY);
    dist = cc.pDistance(aim, pos);
    time = dist / this.obj._speed;
  
    actionMove = cc.MoveTo.create(time, aim);
    actionMoveDone = cc.CallFunc.create(function(node) {
      node && node.update();
    }, this.obj);
    
    this.obj.runAction(cc.Sequence.create(actionMove, actionMoveDone));
  }
};
AttackMovement.prototype.shoot = function (delay) {
  _layer.shoot(_layer, this.obj, _layer._players, delay);
};