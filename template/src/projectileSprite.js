var ProjectileSprite = cc.Sprite.extend({
  run: function(context, origin) {
    this.setPosition(origin._position);
    this.rotation = origin.rotation;
 
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
  }
});