function addWallsAndGround(space) {
  leftWall = new cp.SegmentShape(space.staticBody, new cp.v(0, 0), new cp.v(0, _size.height), WALLS_WIDTH);
  leftWall.setElasticity(WALLS_ELASTICITY);
  leftWall.setFriction(WALLS_FRICTION);
  space.addStaticShape(leftWall);

  rightWall = new cp.SegmentShape(space.staticBody, new cp.v(_size.width, _size.height), new cp.v(_size.width, 0), WALLS_WIDTH);
  rightWall.setElasticity(WALLS_ELASTICITY);
  rightWall.setFriction(WALLS_FRICTION);
  space.addStaticShape(rightWall);

  bottomWall = new cp.SegmentShape(space.staticBody, new cp.v(0, 0), new cp.v(_size.width, 0), WALLS_WIDTH);
  bottomWall.setElasticity(WALLS_ELASTICITY);
  bottomWall.setFriction(WALLS_FRICTION);
  space.addStaticShape(bottomWall);

  upperWall = new cp.SegmentShape(space.staticBody, new cp.v(0, _size.height), new cp.v(_size.width, _size.height), WALLS_WIDTH);
  upperWall.setElasticity(WALLS_ELASTICITY);
  upperWall.setFriction(WALLS_FRICTION);
  space.addStaticShape(upperWall);
}

function preCacheAnimations(layer, file) {
  // Explosions
  cc.spriteFrameCache.addSpriteFrames(file.plist);
  var explosionTexture = cc.textureCache.addImage(file.image);
  // Adds a sprite batch node.
  var explosions = new cc.SpriteBatchNode(explosionTexture);
  explosions.setBlendFunc(cc.SRC_ALPHA, cc.ONE);
  // Adds spriteSheet in this layer.
  layer.addChild(explosions, 3);
  // sharedExplosion
  var animFrames = [];
  var str = '';
  for (var i = 1; i < file.frames; i++) {
    str = file.animation + i + '.png';
    animFrames.push(cc.spriteFrameCache.getSpriteFrame(str));
  }
  var animation = new cc.Animation(animFrames, file.slot);
  cc.animationCache.addAnimation(animation, file.animation);
}

function setupAnimations(layer) {
  preCacheAnimations(layer, {
    plist: res.explosion_yellow_plist,
    image: res.explosion_yellow_png,
    animation: "explosion_yellow",
    frames: 12,
    slot: 0.05
  });
  preCacheAnimations(layer, {
    plist: res.explosion_red_plist,
    image: res.explosion_red_png,
    animation: "explosion_red",
    frames: 12,
    slot: 0.03
  });
  preCacheAnimations(layer, {
    plist: res.explosion_black_plist,
    image: res.explosion_black_png,
    animation: "explosion_black",
    frames: 35,
    slot: 0.04
  });
}