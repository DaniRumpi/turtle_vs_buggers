var Explosion = cc.Sprite.extend({
  active: true,
  ctor: function (name, color) {
    var pFrame = cc.spriteFrameCache.getSpriteFrame(name+'1.png');
    this._super(pFrame);
    this.animation = cc.animationCache.getAnimation(name);
    this.config(color);
  },
  config: function(color) {
    if (color && HELPER_COLORS[color]) {
      this.color = HELPER_COLORS[color];
    } else {
      this.setBlendFunc(cc.SRC_ALPHA, cc.ONE);
    }
  },
  play: function (position) {
    position && this.setPosition(position);
    this.runAction(cc.sequence(
      cc.animate(this.animation),
      cc.callFunc(this.removeFromParent, this)
    ));
  }
});