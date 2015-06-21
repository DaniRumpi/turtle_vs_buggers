var RandomMovement = function(GAME) {
  var calcDistance = function (v1, v2) {
    var pow1 = (v1.x - v2.x) * (v1.x - v2.x);
    var pow2 = (v1.y - v2.y) * (v1.y - v2.y);
    return Math.sqrt(pow1 + pow2);
  };
  var calcTime = function (dist, speed) {
    return (dist / speed) * 1000;
  };
  this.getPositionAim = function() {
    var _posX, _posY;
    _posX = parseInt(Math.random() * (GAME.SIZE.width - GAME.MONSTER_SIZE.width)) + GAME.MONSTER_SIZE.width / 2;
    _posY = parseInt(Math.random() * (GAME.SIZE.height - GAME.MONSTER_SIZE.height)) + GAME.MONSTER_SIZE.height / 2;
    return {x: _posX, y: _posY};
  };
  this.calcWalk = function (monster, t2) {
    if (monster.aimX !== undefined) {
      monster.setPosition(monster.getAim());
    }
    monster.setAim(this.getPositionAim());
    monster.setUpdated(t2);
    var dist = calcDistance(monster.getPosition(), monster.getAim());
    var time = calcTime(dist, monster.speed);
    monster.setDistance(dist);
    monster.setTime(time);
  };
};

exports.RandomMovement = RandomMovement;