var RandomMovement = function(GAME, HELPER) {
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
    var dist = HELPER.calcDistance(monster.getPosition(), monster.getAim());
    var time = HELPER.calcTime(dist, monster.speed);
    monster.setDistance(dist);
    monster.setTime(time);
  };
};

exports.RandomMovement = RandomMovement;