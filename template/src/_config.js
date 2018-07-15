RANDOM_MOVE = "random";
FOLLOW_MOVE = "follow";
ATTACK_MOVE = "attack";
ATTACK_MOVE2 = "attack2";
ATTACK_MOVE3 = "attack3";

PLAYER_LEVEL1 = {
  speed: 2,
  power: 1,
  health: 25,
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
PLAYER_MULTIPLAYER = {
  speed: 3,
  power: 1,
  health: 300,
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
LEVEL4 = {
  LIMIT_MONSTERS: 4 + 6 + 8 + 10,
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
      moveType: ATTACK_MOVE2,
      power: 15,
      speed: 93.0,
      health: 15,
      scale: 0.3,
      showTime: 7,
      follow: 500,
      sprite: res.bugger4,
      colorExplosion: "red",
      colorShoot: "red"
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
    },
    {
      moveType: ATTACK_MOVE2,
      power: 15,
      speed: 95.0,
      health: 15,
      scale: 0.3,
      showTime: 13,
      follow: 600,
      sprite: res.bugger4,
      colorExplosion: "red",
      colorShoot: "red"
    },
    {
      moveType: ATTACK_MOVE2,
      power: 15,
      speed: 96.0,
      health: 15,
      scale: 0.3,
      showTime: 18,
      follow: 700,
      sprite: res.bugger4,
      colorExplosion: "red",
      colorShoot: "red"
    }
  ],
  PLAYERS: [PLAYER_LEVEL3],
  BG: {
    sprite: res.bg4,
    color: "yellow"
  }
};
LEVEL5 = {
  LIMIT_MONSTERS: 4 + 6 + 8 + 10 + 6,
  MONSTERS: [
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
      showTime: 10,
      sprite: res.bugger2,
      colorExplosion: "yellow"
    },
    {
      moveType: ATTACK_MOVE2,
      power: 15,
      speed: 95.0,
      health: 15,
      scale: 0.3,
      showTime: 13,
      follow: 600,
      sprite: res.bugger4,
      colorExplosion: "red",
      colorShoot: "red"
    },
    {
      moveType: ATTACK_MOVE2,
      power: 15,
      speed: 96.0,
      health: 15,
      scale: 0.3,
      showTime: 18,
      follow: 700,
      sprite: res.bugger4,
      colorExplosion: "red",
      colorShoot: "red"
    },
    {
      moveType: ATTACK_MOVE3,
      power: 10,
      speed: 95.0,
      health: 100,
      scale: 0.3,
      showTime: 3,
      follow: 1000,
      attack: 0.9,
      sprite: res.bugger5,
      colorExplosion: "yellow",
      colorShoot: "yellow"
    }
  ],
  PLAYERS: [PLAYER_LEVEL3],
  BG: {
    sprite: res.bg5,
    color: "yellow"
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
  speed: 90,
  health: 10,
  scale: 0.3,
  sprite: res.bugger3,
  colorExplosion: "bg",
  colorShoot: "bg"
};
BUGGER4 = {
  moveType: ATTACK_MOVE2,
  power: 15,
  speed: 96,
  health: 15,
  scale: 0.3,
  follow: 600,
  sprite: res.bugger4,
  colorExplosion: "red",
  colorShoot: "bg"
};
BUGGER5 = {
  moveType: ATTACK_MOVE3,
  power: 10,
  speed: 90,
  health: 50,
  scale: 0.3,
  follow: 1000,
  sprite: res.bugger5,
  colorExplosion: "yellow",
  colorShoot: "yellow"
};
// ********* //
// MONSTERS  //
// ********* //
MONSTERS = [BUGGER5, BUGGER4, BUGGER3, BUGGER2, BUGGER1];

LEVEL_MULTIPLAYER = {
  LIMIT_MONSTERS: 9999,
  MONSTERS: [],
  PLAYERS: [PLAYER_MULTIPLAYER],
  BG: {
    sprite: res.bg3,
    color: "bg"
  }
};

GAME = {
  LEVELS: [
    LEVEL1,
    LEVEL2,
    LEVEL3,
    LEVEL4,
    LEVEL5
  ],
  MULTIPLAYER: [
    LEVEL_MULTIPLAYER
  ]
};
