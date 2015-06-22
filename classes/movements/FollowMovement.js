var FollowMovement = function(GAME, players) {
  var calcDistance = function (v1, v2) {
    var pow1 = (v1.x - v2.x) * (v1.x - v2.x);
    var pow2 = (v1.y - v2.y) * (v1.y - v2.y);
    return Math.sqrt(pow1 + pow2);
  };
  var calcTime = function (dist, speed) {
    return (dist / speed) * 1000;
  };
  var getMin = function(arr) {
    var min, i;
    min = arr[0];
    i = arr.length - 1;
    for (i; i >= 0; i--) {
      if (arr[i].distance < min.distance) {
        min = arr[i];
      }
    }
    return min;
  };
  this.getNearestPlayer = function(p) {
    var i = players.length - 1;
    for (i; i >= 0; i--) {
      players[i].distance = calcDistance(p, players[i]);
    }
    return getMin(players);
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
    var dist = calcDistance(monster, monster.getAim());
    monster.setUpdated(t2);
    monster.setDistance(dist);
    monster.setTime(calcTime(dist, monster.speed));
  };
};

exports.FollowMovement = FollowMovement;