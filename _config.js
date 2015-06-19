var RANDOM_MOVE = "random";
var FOLLOW_MOVE = "follow";
var ATTACK_MOVE = "attack";

var RES = {
  bugger1: "bugger1.png",
  bugger2: "bugger2.png",
  bugger3: "bugger3.png"
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
  speed: 85.0,
  health: 4,
  scale: 0.3,
  sprite: RES.bugger2,
  colorExplosion: "yellow"
};
BUGGER3 = {
  moveType: ATTACK_MOVE,
  power: 10,
  speed: 85.0,
  health: 10,
  scale: 0.3,
  sprite: RES.bugger3,
  colorExplosion: "bg",
  colorShoot: "bg"
};

GAME = {
  MAX_MONSTERS: 1,
  MIN_MONSTERS: 1,
  MONSTERS: [BUGGER1, BUGGER2, BUGGER3]
};

exports.GAME = GAME;