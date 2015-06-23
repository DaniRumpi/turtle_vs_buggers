RANDOM_MOVE = "random";
FOLLOW_MOVE = "follow";
ATTACK_MOVE = "attack";

PLAYER_LEVEL1 = {
  speed: 2,
  power: 1,
  health: 100,
  scale: 0.4,
  sprite: TURTLE_FRAMES,
  colorExplosion: "default",
  colorShoot: "default"
};
PLAYER_LEVEL2 = {
  speed: 2,
  power: 1,
  health: 50,
  scale: 0.4,
  sprite: TURTLE_FRAMES,
  colorExplosion: "default",
  colorShoot: "default"
};
PLAYER_LEVEL3 = {
  speed: 3,
  power: 1,
  health: 150,
  scale: 0.4,
  sprite: TURTLE_FRAMES,
  colorExplosion: "default",
  colorShoot: "default"
};
PLAYER = PLAYER_LEVEL3;

LEVEL1 = {
  LIMIT_MONSTERS: 4,
  MONSTERS: [
    {
      moveType: RANDOM_MOVE,
      power: 1,
      speed: 70.0,
      health: 1,
      scale: 0.3,
      showTime: 1,
      sprite: res.bugger1,
      colorExplosion: "red"
    },
    {
      moveType: RANDOM_MOVE,
      power: 1,
      speed: 70.0,
      health: 1,
      scale: 0.3,
      showTime: 3,
      sprite: res.bugger1,
      colorExplosion: "red"
    },
    {
      moveType: RANDOM_MOVE,
      power: 1,
      speed: 70.0,
      health: 1,
      scale: 0.3,
      showTime: 7,
      sprite: res.bugger1,
      colorExplosion: "red"
    },
    {
      moveType: RANDOM_MOVE,
      power: 1,
      speed: 70.0,
      health: 1,
      scale: 0.3,
      showTime: 10,
      sprite: res.bugger1,
      colorExplosion: "red"
    }
  ],
  PLAYERS: [PLAYER_LEVEL1],
  BG: {
    sprite: res.bg3,
    color: "bg"
  }
};
LEVEL2 = {
  LIMIT_MONSTERS: 4 + 6,
  MONSTERS: [
    {
      moveType: RANDOM_MOVE,
      power: 1,
      speed: 74.0,
      health: 1,
      scale: 0.3,
      showTime: 1,
      sprite: res.bugger1,
      colorExplosion: "red"
    },
    {
      moveType: FOLLOW_MOVE,
      power: 4,
      speed: 74.0,
      health: 3,
      scale: 0.3,
      showTime: 1,
      sprite: res.bugger2,
      colorExplosion: "yellow"
    },
    {
      moveType: RANDOM_MOVE,
      power: 1,
      speed: 74.0,
      health: 1,
      scale: 0.3,
      showTime: 5,
      sprite: res.bugger1,
      colorExplosion: "red",
    },
    {
      moveType: FOLLOW_MOVE,
      power: 4,
      speed: 74.0,
      health: 3,
      scale: 0.3,
      showTime: 5,
      sprite: res.bugger2,
      colorExplosion: "yellow",
    },
    {
      moveType: FOLLOW_MOVE,
      power: 4,
      speed: 75.0,
      health: 3,
      scale: 0.3,
      showTime: 11,
      sprite: res.bugger2,
      colorExplosion: "yellow",
    },
    {
      moveType: FOLLOW_MOVE,
      power: 4,
      speed: 75.0,
      health: 3,
      scale: 0.3,
      showTime: 11,
      sprite: res.bugger2,
      colorExplosion: "yellow",
    }
  ],
  PLAYERS: [PLAYER_LEVEL2],
  BG: {
    sprite: res.bg2,
    color: "bg"
  }
};
LEVEL3 = {
  LIMIT_MONSTERS: 4 + 6 + 8,
  MONSTERS: [
    {
      moveType: RANDOM_MOVE,
      power: 1,
      speed: 80.0,
      health: 1,
      scale: 0.3,
      showTime: 1,
      sprite: res.bugger1,
      colorExplosion: "red",
    },
    {
      moveType: FOLLOW_MOVE,
      power: 4,
      speed: 80.0,
      health: 3,
      scale: 0.3,
      showTime: 1,
      sprite: res.bugger2,
      colorExplosion: "yellow",
    },
    {
      moveType: ATTACK_MOVE,
      power: 10,
      speed: 80.0,
      health: 6,
      scale: 0.3,
      showTime: 1,
      sprite: res.bugger3,
      colorExplosion: "bg",
      colorShoot: "bg"
    },
    {
      moveType: FOLLOW_MOVE,
      power: 4,
      speed: 85.0,
      health: 3,
      scale: 0.3,
      showTime: 6,
      sprite: res.bugger2,
      colorExplosion: "yellow"
    },
    {
      moveType: ATTACK_MOVE,
      power: 10,
      speed: 80.0,
      health: 6,
      scale: 0.3,
      showTime: 7,
      sprite: res.bugger3,
      colorExplosion: "bg",
      colorShoot: "bg"
    },
    {
      moveType: FOLLOW_MOVE,
      power: 4,
      speed: 85.0,
      health: 3,
      scale: 0.3,
      showTime: 10,
      sprite: res.bugger2,
      colorExplosion: "yellow"
    },
    {
      moveType: ATTACK_MOVE,
      power: 10,
      speed: 80.0,
      health: 6,
      scale: 0.3,
      showTime: 10,
      sprite: res.bugger3,
      colorExplosion: "bg",
      colorShoot: "bg"
    },
    {
      moveType: ATTACK_MOVE,
      power: 10,
      speed: 85.0,
      health: 6,
      scale: 0.3,
      showTime: 10,
      sprite: res.bugger3,
      colorExplosion: "bg",
      colorShoot: "bg"
    }
  ],
  PLAYERS: [PLAYER_LEVEL3],
  BG: {
    sprite: res.bg3,
    color: "bg"
  }
};

BUGGER1 = {
  moveType: RANDOM_MOVE,
  power: 1,
  speed: 90.0,
  health: 1,
  scale: 0.3,
  sprite: res.bugger1,
  colorExplosion: "red",
};
BUGGER2 = {
  moveType: FOLLOW_MOVE,
  power: 2,
  speed: 89,
  health: 4,
  scale: 0.3,
  sprite: res.bugger2,
  colorExplosion: "yellow"
};
BUGGER3 = {
  moveType: ATTACK_MOVE,
  power: 10,
  speed: 87,
  health: 10,
  scale: 0.3,
  sprite: res.bugger3,
  colorExplosion: "bg",
  colorShoot: "bg"
};
// ********* //
// MONSTERS  //
// ********* //
MONSTERS = [BUGGER3, BUGGER2, BUGGER1];

LEVEL_MULTIPLAYER = {
  LIMIT_MONSTERS: 1,
  MONSTERS: [],
  PLAYERS: [PLAYER],
  BG: {
    sprite: res.bg3,
    color: "bg"
  }
};

GAME = {
  LEVELS: [
    LEVEL1,
    LEVEL2,
    LEVEL3
  ],
  MULTIPLAYER: [
    LEVEL_MULTIPLAYER
  ]
};
