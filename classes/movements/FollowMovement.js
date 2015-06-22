var FollowMovement = function(GAME, players, HELPER) {
  this.getNearestPlayer = function(p) {
    var i = players.length - 1;
    for (i; i >= 0; i--) {
      players[i].distance = HELPER.calcDistance(p, players[i]);
    }
    return HELPER.getMin(players);
  };
  this.getMiddlePositionAim = function(monster, player) {
    var x = (monster.x + player.x + (Math.random() * 100) - 50) / 2;
    var y = (monster.y + player.y + (Math.random() * 100) - 50) / 2;
    return {x: x, y: y};
  };
  this.getPositionAim = function(player) {
    var x = player.x + (Math.random() * 20) - 10;
    var y = player.y + (Math.random() * 20) - 10;
    return {x: x, y: y};
  };
  this.calcWalk = function (monster, t2) {
    if (monster.aimX !== undefined) {
      monster.setPosition(monster.getAim());
    }
    var player = this.getNearestPlayer(monster);
    if (player.distance > 300) {
      player.distance = player.distance / 2;
      monster.setAim(this.getMiddlePositionAim(monster, player));
    } else {
      monster.setAim(this.getPositionAim(player));
    }
    var dist = HELPER.calcDistance(monster, monster.getAim());
    monster.setUpdated(t2);
    monster.setDistance(dist);
    monster.setTime(HELPER.calcTime(dist, monster.speed));
  };
};

exports.FollowMovement = FollowMovement;