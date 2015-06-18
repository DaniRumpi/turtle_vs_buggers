var WALLS_WIDTH = 15;
var WALLS_ELASTICITY = 0;
var WALLS_FRICTION = 0;

function addWallsAndGround(space) {
  var l = -10, r = _size.width + 10, t = _size.height + 10, b = -10;
  
  leftWall = new cp.SegmentShape(space.staticBody, new cp.v(l, b), new cp.v(l, t), WALLS_WIDTH);
  leftWall.setElasticity(WALLS_ELASTICITY);
  leftWall.setFriction(WALLS_FRICTION);
  space.addStaticShape(leftWall);

  rightWall = new cp.SegmentShape(space.staticBody, new cp.v(r, t), new cp.v(r, b), WALLS_WIDTH);
  rightWall.setElasticity(WALLS_ELASTICITY);
  rightWall.setFriction(WALLS_FRICTION);
  space.addStaticShape(rightWall);

  bottomWall = new cp.SegmentShape(space.staticBody, new cp.v(l, b), new cp.v(r, b), WALLS_WIDTH);
  bottomWall.setElasticity(WALLS_ELASTICITY);
  bottomWall.setFriction(WALLS_FRICTION);
  space.addStaticShape(bottomWall);

  upperWall = new cp.SegmentShape(space.staticBody, new cp.v(l, t), new cp.v(r, t), WALLS_WIDTH);
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

// ANIMATIONS
EXPLOSION_YELLOW = "explosion_yellow";
TURTLE_FRAMES = "turtle_frames";

function setupAnimations(layer) {
  preCacheAnimations(layer, {
    plist: res.explosion_yellow_plist,
    image: res.explosion_yellow_png,
    animation: EXPLOSION_YELLOW,
    frames: 12,
    slot: 0.05
  });
  preCacheAnimations(layer, {
    plist: res.turtle_frames_plist,
    image: res.turtle_frames_png,
    animation: TURTLE_FRAMES,
    frames: 5,
    slot: 0.06
  });
}

function setup_HELPER_COLORS() {
  HELPER_COLORS = {
    red: cc.color(255, 50, 10),
    yellow: cc.color(200,200, 100),
    blue: cc.color(25,0,255),
    black: cc.color(50,50,50),
    bg: cc.color(0,200,200),
    default: cc.color(255,255,255)
  };
}