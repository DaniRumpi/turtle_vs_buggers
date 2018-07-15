
var Monster = require("./models/Monster").Monster;
var RandomMovement = require("./movements/RandomMovement").RandomMovement;
var FollowMovement = require("./movements/FollowMovement").FollowMovement;
var HelperMovements = require("./movements/HelperMovements").HelperMovements;

var MonstersController = function (GAME, monsters, players) {
  this.moveHelper = new HelperMovements();
  this.randomMove = new RandomMovement(GAME, this.moveHelper);
  this.followMove = new FollowMovement(GAME, players, this.moveHelper);
  this.monsters = monsters;
  
  var _min = GAME.MIN_MONSTERS;
  var _max = GAME.MAX_MONSTERS - GAME.MIN_MONSTERS;
  
  var id = 0;

  var find = function (id) {
    var i = this.monsters.length - 1;
    for (i; i >= 0; i--) {
      if (this.monsters[i])
        if (id === this.monsters[i].id)
          return this.monsters[i];
    }
  };
  this.getRandomPosition = function () {
    var _posX, _posY;
    while (true) {
      _posX = parseInt(Math.random() * (GAME.SIZE.width - GAME.MONSTER_SIZE.width)) + GAME.MONSTER_SIZE.width / 2;
      _posY = parseInt(Math.random() * (GAME.SIZE.height - GAME.MONSTER_SIZE.height)) + GAME.MONSTER_SIZE.height / 2;
      if (Math.abs(_posX - (GAME.SIZE.width / 2)) > GAME.MIDDLE.width &&
          Math.abs(_posY - (GAME.SIZE.height / 2)) > GAME.MIDDLE.height) {
        break;
      }
    }
    return {x: _posX, y: _posY};
  };
  this.getRandomMonster = function () {
    var n = Math.round(Math.random() * (GAME.MONSTERS.length - 1));
    console.log(n, GAME.MONSTERS.length, GAME.MONSTERS[n])
    return GAME.MONSTERS[n];
  };
  this.getRandomSpeed = function(speed) {
    return speed + (Math.random() * 20) - 10;
  };
  this.new = function() {
    var dataMons = this.getRandomMonster();
    var monster = new Monster(dataMons);
    var pos = this.getRandomPosition();
    monster.moveType = dataMons.moveType;
    monster.setX(pos.x);
    monster.setY(pos.y);
    monster.speed = this.getRandomSpeed(dataMons.speed);
    monster.health = dataMons.health;
    monster.id = ++id;
    return monster;
  };
  this.update = function (data) {
    var monster = Monster.find(data.id);
    monster.update(data);
  };
  this.getRandomMonsters = function(countMonsters) {
    var monsters = [];
    if (this.monsters.length < 3) {
      var n = parseInt(Math.random() * _max) + _min;
      if (n + countMonsters > GAME.LIMIT_MONSTERS) {
        n = GAME.LIMIT_MONSTERS - countMonsters;
      }
      var i;
      for (i = n - 1; i >= 0; i--) {
        monsters.push(this.new());
      }
    }
    return monsters;
  };
  this.calcPositionWalking = function (monster, t2) {
    var d2, percent;
    d2 = monster.speed * (t2 - monster.updated) / 1000;
    percent = d2 * 100 / monster.d;
    if (monster.x - monster.aimX > 0) {
      monster.x -= (monster.x - monster.aimX) * percent;
    } else {
      monster.x += (monster.aimX - monster.x) * percent;
    }
    if (monster.y - monster.aimY > 0) {
      monster.y -= (monster.y - monster.aimY) * percent;
    } else {
      monster.y += (monster.aimY - monster.y) * percent;
    }
    monster.setDistance(monster.d - d2);
  };
  this.calcWalk = function(monster, t2) {
    if (monster.moveType === GAME.RANDOM_MOVE) {
      this.randomMove.calcWalk(monster, t2);
    } else { // FOLLOW_MOVE & ATTACK_MOVE
      this.followMove.calcWalk(monster, t2);
    }
  };
  this.getRandomShoot = function() {
    if (Math.random() > 0.8) { // 0.2 probability
      return Math.random();
    }
  };
  this.updateAll = function () {
    var monstersAttack = [], attack;
    var newDate = new Date().getTime();
    var i = this.monsters.length - 1;
    for (i; i >= 0; i--) {
      if (!this.monsters[i].getAimX() ||
          (newDate - this.monsters[i].updated >= this.monsters[i].t)) {
        this.calcWalk(this.monsters[i], newDate);
      } else {
        this.calcPositionWalking(this.monsters[i], newDate);
      }
      // ATTACK MODE
      if (this.monsters[i].moveType.indexOf(GAME.ATTACK_MOVE) >= 0) {
        attack = this.getRandomShoot();
        if (attack) {
          this.monsters[i].attack = attack;
          monstersAttack.push(this.monsters[i]);
        }
      }
    }
    return monstersAttack;
  };
};

exports.MonstersController = MonstersController;
