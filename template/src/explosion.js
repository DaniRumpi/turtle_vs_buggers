function preCacheExplosions(layer) {
  // Explosions
  cc.spriteFrameCache.addSpriteFrames(res.explosion_plist);
  var explosionTexture = cc.textureCache.addImage(res.explosion_png);
  // Adds a sprite batch node.
  layer._explosions = new cc.SpriteBatchNode(explosionTexture);
  layer._explosions.setBlendFunc(cc.SRC_ALPHA, cc.ONE);
  // Adds spriteSheet in this layer.
  layer.addChild(layer._explosions, 3);
  
  // sharedExplosion
  var animFrames = [];
  var str = '';
  // for (var i = 1; i < 35; i++) {
  //   str = 'explosion' + (i < 10 ? ('0' + i) : i) + '.png';
  //   var frame = cc.spriteFrameCache.getSpriteFrame(str);
  //   animFrames.push(frame);
  // }
  for (var i = 1; i < 12; i++) {
    str = 'explosion' + i + '.png';
    var frame = cc.spriteFrameCache.getSpriteFrame(str);
    // TintBy
    // var sprite_action = cc.TintBy.create(2, -127, -255, -127);
    // var repeat_action = cc.Repeat.create(sprite_action, 3);
    // frame.runAction(repeat_action);
    animFrames.push(frame);
  }
  var animation = new cc.Animation(animFrames, 0.06);
  cc.animationCache.addAnimation(animation, 'Explosion');

}

var Explosion = cc.Sprite.extend({
  active: true,
  ctor: function () {
    var pFrame = cc.spriteFrameCache.getSpriteFrame('explosion1.png');
    this._super(pFrame);
    this.setBlendFunc(cc.SRC_ALPHA, cc.ONE);
    this.animation = cc.animationCache.getAnimation('Explosion');
    
    // var sprite_action = cc.TintBy.create(2, -127, -255, -127);
    // var repeat_action = cc.Repeat.create(sprite_action, 3);
    // this.animation.runAction(repeat_action);
  },
  play: function (position) {
    position && this.setPosition(position);
    this.runAction(cc.sequence(
      cc.animate(this.animation),
      cc.callFunc(this.removeFromParent, this)
    ));
  },
  // destroy: function () {
  //   this.removeFromParent();
  // },
  // setRandomPosition: function() {
  //   this._posX = parseInt(cc.random0To1() * _size.width);
  //   this._posY = parseInt(cc.random0To1() * _size.height);
  //   this.setPosition(cc.p(this._posX, this._posY));
  // },
  // sharedExplosion: function () {
  //   var animFrames = [];
  //   var str = '';
  //   for (var i = 1; i < 35; i++) {
  //       str = 'explosion_' + (i < 10 ? ('0' + i) : i) + '.png';
  //       var frame = cc.spriteFrameCache.getSpriteFrame(str);
  //       animFrames.push(frame);
  //   }
  //   var animation = new cc.Animation(animFrames, 0.04);
  //   cc.animationCache.addAnimation(animation, 'Explosion');
  // },
  
  // getOrCreateExplosion: function () {
  //   var selChild = null, j;
  //   for (j = 0; j < EXPLOSIONS.length; j++) {
  //     selChild = EXPLOSIONS[j];
  //     if (!selChild.active) {
  //       selChild.visible = true;
  //       selChild.active = true;
  //       selChild.play();
  //       return selChild;
  //     }
  //   }
  //   selChild = Explosion.create();
  //   selChild.play();
  //   return selChild;
  // },
  // create: function () {
  //   var explosion = new Explosion();
  //   _layer.addExplosions(explosion);
  //   EXPLOSIONS.push(explosion);
  //   return explosion;
  // },
  
  // preSet: function () {
  //   var explosion = null;
  //   for (var i = 0; i < 10; i++) {
  //     explosion = Explosion.create();
  //     explosion.visible = false;
  //     explosion.active = false;
  //   }
  // }

});