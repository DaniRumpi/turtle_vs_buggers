var ProjectileSprite = cc.Sprite.extend({
  run: function(context, origin, targets, power) {
    this.setPosition(origin.position);
    this.rotation = origin.rotation;
    this.origin = origin;
    this.targets = targets;
    this._power = power;
    if (this.origin._colorShoot && HELPER_COLORS[this.origin._colorShoot]) {
      this.color = HELPER_COLORS[this.origin._colorShoot];
    }
 
    var x = 0, y = _size.width;
    var aim = cc.pRotateByAngle(cc.p(x, y), cc.p(), -cc.degreesToRadians(origin.rotation));

    // Move projectile to actual endpoint
    this.runAction(cc.Sequence.create(
      cc.MoveBy.create(1, aim),
      cc.CallFunc.create(function(node) {
        var index = context._projectiles.indexOf(node);
        context._projectiles.splice(index, 1);
      }, this),
      cc.RemoveSelf.create(true)
    ));
  },
  autodestroy: function() {
    this.removeFromParent();
    _layer.addExplosion(EXPLOSION_YELLOW, this._position, 3, this.origin._colorExplosion);
  }
});