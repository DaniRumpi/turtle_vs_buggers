var RANDOM_MOVE = "random";
var FOLLOW_MOVE = "follow";
var ATTACK_MOVE = "attack";
var ATTACK_MOVE2 = "attack2";
var ATTACK_MOVE3 = "attack3";

var RES = {
  bugger1: "bugger1.png",
  bugger2: "bugger2.png",
  bugger3: "bugger3.png",
  bugger4: "bugger4.png",
  bugger5: "bugger5.png"
};

BUGGER1 = {
  moveType: RANDOM_MOVE,
  power: 1,
  speed: 90.0,
  health: 1,
  scale: 0.3,
  sprite: RES.bugger1,
  colorExplosion: "red",
};
BUGGER2 = {
  moveType: FOLLOW_MOVE,
  power: 2,
  speed: 89.0,
  health: 4,
  scale: 0.3,
  sprite: RES.bugger2,
  colorExplosion: "yellow"
};
BUGGER3 = {
  moveType: ATTACK_MOVE,
  power: 10,
  speed: 87.0,
  health: 10,
  scale: 0.3,
  sprite: RES.bugger3,
  colorExplosion: "bg",
  colorShoot: "bg"
};
BUGGER4 = {
  moveType: ATTACK_MOVE2,
  power: 12,
  speed: 87.0,
  health: 15,
  scale: 0.6,
  sprite: RES.bugger4,
  colorExplosion: "red",
  colorShoot: "red"
};
BUGGER5 = {
  moveType: ATTACK_MOVE3,
  power: 12,
  speed: 90.0,
  health: 50,
  scale: 0.6,
  sprite: RES.bugger5,
  colorExplosion: "yellow",
  colorShoot: "yellow"
};

GAME = {
  LIMIT_MONSTERS: 35,
  MAX_MONSTERS: 10,
  MIN_MONSTERS: 1,
  HURT: 5,
  DESTROY: 10,
  // MONSTERS: [BUGGER5, BUGGER4, BUGGER3, BUGGER2, BUGGER1],
  MONSTERS: [BUGGER5, BUGGER4, BUGGER3, BUGGER2, BUGGER1],
  RANDOM_MOVE: RANDOM_MOVE,
  FOLLOW_MOVE: FOLLOW_MOVE,
  ATTACK_MOVE: ATTACK_MOVE,
  ATTACK_MOVE2: ATTACK_MOVE2,
  ATTACK_MOVE3: ATTACK_MOVE3,
  SIZE: {width: 800, height: 480},
  MIDDLE: {width: 120, height: 100},
  MONSTER_SIZE: {width: 100, height: 100}
};

exports.GAME = GAME;