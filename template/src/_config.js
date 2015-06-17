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
  health: 50,
  scale: 0.4,
  sprite: TURTLE_FRAMES,
  colorExplosion: "default",
  colorShoot: "default"
};

LEVEL1 = {
  MAX_MONSTERS: 4,
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
  PLAYERS: [PLAYER_LEVEL1]
};
LEVEL2 = {
  MAX_MONSTERS: 6,
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
  PLAYERS: [PLAYER_LEVEL2]
};
LEVEL3 = {
  MAX_MONSTERS: 8,
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
      colorExplosion: "blue",
      colorShoot: "blue"
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
      colorExplosion: "blue",
      colorShoot: "blue"
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
      colorExplosion: "blue",
      colorShoot: "blue"
    },
    {
      moveType: ATTACK_MOVE,
      power: 10,
      speed: 85.0,
      health: 6,
      scale: 0.3,
      showTime: 10,
      sprite: res.bugger3,
      colorExplosion: "blue",
      colorShoot: "blue"
    }
  ],
  PLAYERS: [PLAYER_LEVEL3]
};
GAME = {
  LEVELS: [
    LEVEL1,
    LEVEL2,
    LEVEL3
  ]
}