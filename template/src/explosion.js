var Explosion = cc.Sprite.extend({
  active: true,
  ctor: function (name) {
    var pFrame = cc.spriteFrameCache.getSpriteFrame(name+'1.png');
    this._super(pFrame);
    this.setBlendFunc(cc.SRC_ALPHA, cc.ONE);
    this.animation = cc.animationCache.getAnimation(name);
  },
  play: function (position) {
    position && this.setPosition(position);
    this.runAction(cc.sequence(
      cc.animate(this.animation),
      cc.callFunc(this.removeFromParent, this)
    ));
  }
});