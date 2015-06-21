var ProjectileSprite = cc.Sprite.extend({
  run: function(context, origin, targets) {
    this.setPosition(origin.x, origin.y);
    this.rotation = origin.rotation;
    this.origin = origin;
    this.id = origin.id;
    this._shoots = origin._shoots;
    this.targets = targets;
    this._power = origin._power;
    if (this.origin._colorShoot && HELPER_COLORS[this.origin._colorShoot]) {
      this.color = HELPER_COLORS[this.origin._colorShoot];
    }
 
    var x = 0, y = _size.width;
    var aim = cc.pRotateByAngle(cc.p(x, y), cc.p(), -cc.degreesToRadians(origin.rotation));

    // Move projectile to actual endpoint
    this.runAction(cc.Sequence.create(
      cc.MoveBy.create(1, aim),
      cc.CallFunc.create(function(node) {
        context._projectiles.splice(context._projectiles.indexOf(node), 1);
      }, this),
      cc.RemoveSelf.create(true)
    ));
  },
  autodestroy: function() {
    this.removeFromParent();
    _layer.addExplosion(EXPLOSION_YELLOW, this._position, 3, this.origin._colorExplosion);
  }
});