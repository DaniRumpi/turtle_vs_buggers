RANDOM_MOVE = "random";
FOLLOW_MOVE = "follow";
ATTACK_MOVE = "attack";

LEVEL1 = {
  MAX_MONSTERS: 4,
  MONSTERS: [
    {
      moveType: RANDOM_MOVE,
      speed: 70.0,
      health: 1,
      scale: 0.3,
      showTime: 1,
      sprite: res.bugger1
    },
    {
      moveType: RANDOM_MOVE,
      speed: 70.0,
      health: 1,
      scale: 0.3,
      showTime: 3,
      sprite: res.bugger1
    },
    {
      moveType: RANDOM_MOVE,
      speed: 70.0,
      health: 1,
      scale: 0.3,
      showTime: 7,
      sprite: res.bugger1
    },
    {
      moveType: RANDOM_MOVE,
      speed: 70.0,
      health: 1,
      scale: 0.3,
      showTime: 10,
      sprite: res.bugger1
    }
  ],
  PLAYERS: [
    {
      speed: 2,
      power: 1,
      health: 100,
      scale: 0.4,
      sprite: res.mainPlayer
    }
  ]
};
LEVEL2 = {
  MAX_MONSTERS: 6,
  MONSTERS: [
    {
      moveType: RANDOM_MOVE,
      speed: 74.0,
      health: 1,
      scale: 0.3,
      showTime: 1,
      sprite: res.bugger1
    },
    {
      moveType: FOLLOW_MOVE,
      speed: 74.0,
      health: 3,
      scale: 0.3,
      showTime: 1,
      sprite: res.bugger2
    },
    {
      moveType: RANDOM_MOVE,
      speed: 74.0,
      health: 1,
      scale: 0.3,
      showTime: 5,
      sprite: res.bugger1
    },
    {
      moveType: FOLLOW_MOVE,
      speed: 74.0,
      health: 3,
      scale: 0.3,
      showTime: 5,
      sprite: res.bugger2
    },
    {
      moveType: FOLLOW_MOVE,
      speed: 75.0,
      health: 3,
      scale: 0.3,
      showTime: 11,
      sprite: res.bugger2
    },
    {
      moveType: FOLLOW_MOVE,
      speed: 75.0,
      health: 3,
      scale: 0.3,
      showTime: 11,
      sprite: res.bugger2
    }
  ],
  PLAYERS: [
    {
      speed: 2,
      power: 1,
      health: 50,
      scale: 0.4,
      sprite: res.mainPlayer
    }
  ]
};
LEVEL3 = {
  MAX_MONSTERS: 8,
  MONSTERS: [
    {
      moveType: RANDOM_MOVE,
      speed: 80.0,
      health: 1,
      scale: 0.3,
      showTime: 1,
      sprite: res.bugger1
    },
    {
      moveType: FOLLOW_MOVE,
      speed: 80.0,
      health: 3,
      scale: 0.3,
      showTime: 1,
      sprite: res.bugger2
    },
    {
      moveType: ATTACK_MOVE,
      speed: 75.0,
      health: 6,
      scale: 0.3,
      showTime: 1,
      sprite: res.bugger3
    },
    {
      moveType: FOLLOW_MOVE,
      speed: 80.0,
      health: 3,
      scale: 0.3,
      showTime: 6,
      sprite: res.bugger2
    },
    {
      moveType: ATTACK_MOVE,
      speed: 75.0,
      health: 6,
      scale: 0.3,
      showTime: 7,
      sprite: res.bugger3
    },
    {
      moveType: FOLLOW_MOVE,
      speed: 80.0,
      health: 3,
      scale: 0.3,
      showTime: 10,
      sprite: res.bugger1
    },
    {
      moveType: ATTACK_MOVE,
      speed: 80.0,
      health: 6,
      scale: 0.3,
      showTime: 10,
      sprite: res.bugger3
    },
    {
      moveType: ATTACK_MOVE,
      speed: 80.0,
      health: 6,
      scale: 0.3,
      showTime: 10,
      sprite: res.bugger3
    }
  ],
  PLAYERS: [
    {
      speed: 3,
      power: 1,
      health: 50,
      scale: 0.3,
      sprite: res.mainPlayer
    }
  ]
};
GAME = {
  LEVELS: [
    LEVEL1,
    LEVEL2,
    LEVEL3
  ]
}