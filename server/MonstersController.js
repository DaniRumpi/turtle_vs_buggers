var MonstersController = function (Game, Monster, monsters) {
  this.Game = Game;
  this.Monster = Monster;
  this.monsters = monsters;
  
  var _size = {width: 800, height: 480};
  var _middle = {width: 90, height: 70};
  var _monSize = {width: 100, height: 100};
  
  var id = 0;

  var find = function (id) {
    var i = this.monsters.length - 1;
    for (i; i >= 0; i--) {
      if (this.monsters[i])
        if (id === this.monsters[i].id)
          return this.monsters[i];
    }
  };
  var calcDistance = function (v1, v2) {
    var pow1 = (v1.x - v2.x) * (v1.x - v2.x);
    var pow2 = (v1.y - v2.y) * (v1.y - v2.y);
    return Math.sqrt(pow1 + pow2);
  };
  var calcTime = function (pos, aim, speed) {
    return (calcDistance(aim, pos) / speed) * 1000;
  };
  this.calcWalk = function (monster) {
    if (monster.aimX !== undefined) {
      monster.setPosition(monster.getAim());
    }
    monster.setAim(this.getPositionAim());
    monster.setUpdated(new Date().getTime());
    var time = calcTime(monster.getPosition(), monster.getAim(), monster.speed);
    monster.setTime(time);
    console.log("==== calcWalk ====");
    console.log("pos::", monster.getPosition());
    console.log("aim::", monster.getAim());
    console.log("time::", time);
    console.log("speed::", monster.speed);
  };
  this.getRandomPosition = function () {
    var _posX, _posY;
    while (true) {
      _posX = parseInt(Math.random() * (_size.width - _monSize.width)) + _monSize.width / 2;
      _posY = parseInt(Math.random() * (_size.height - _monSize.height)) + _monSize.height / 2;
      if (Math.abs(_posX - (_size.width / 2)) > _middle.width &&
          Math.abs(_posY - (_size.height / 2)) > _middle.height) {
        break;
      }
    }
    return {x: _posX, y: _posY};
  };
  this.getPositionAim = function() {
    var _posX, _posY;
    _posX = parseInt(Math.random() * (_size.width - _monSize.width)) + _monSize.width / 2;
    _posY = parseInt(Math.random() * (_size.height - _monSize.height)) + _monSize.height / 2;
    return {x: _posX, y: _posY};
  };
  this.new = function() {
    var dataMons = this.Game.MONSTERS.slice(0, 1)[0];
    var monster = new Monster(dataMons);
    var pos = this.getRandomPosition();
    monster.setX(pos.x);
    monster.setY(pos.y);
    monster.speed = dataMons.speed;
    monster.id = ++id;
    return monster;
  };
  this.update = function(data) {
    var monster = Monster.find(data.id);
    monster.update(data);
  };
  this.getRandomMonsters = function() {
    var monsters = [];
    if (this.monsters.length < 1  ) {
      var min = Game.MIN_MONSTERS;
      var max = Game.MAX_MONSTERS - Game.MIN_MONSTERS;
      var n = parseInt(Math.random() * max) + min;
      var i;
      for (i = n - 1; i >= 0; i--) {
        monsters.push(this.new());
      }
    }
    return monsters;
  };
  this.updateAll = function() {
    var updated = [];
    var newDate = new Date().getTime();
    var i = this.monsters.length - 1;
    for (i; i >= 0; i--) {
      if (!this.monsters[i].getAimX() ||
          (newDate - this.monsters[i].updated >= this.monsters[i].t)) {
        this.calcWalk(this.monsters[i]);
        updated.push(this.monsters[i]);
      }
    }
    return updated;
  };
};

exports.MonstersController = MonstersController;