var MonstersController = function() {
  this.setup = function(Game, Monster, monsters) {
    this.Game = Game;
    this.Monster = Monster;
    this.monsters = monsters;
  };
  var find = function(id) {
    var i = this.monsters.length - 1;
    for (i; i >= 0; i--) {
      if (this.monsters[i])
        if (id === this.monsters[i].id)
          return this.monsters[i];
    }
  };
  this.update = function(data) {
    var monster = Monster.find(data.id);
    monster.update(data);
  };
  this.getPositionAim = function() {
    return {x: Math.random(), y: Math.random()};
  };
  this.updateAll = function() {
    var i = this.monsters.length - 1;
    for (i; i >= 0; i--) {
      monster[i].setAim(this.getPositionAim());
    }
  };
};

exports.MonstersController = MonstersController;