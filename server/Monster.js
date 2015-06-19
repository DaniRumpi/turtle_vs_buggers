var Monster = function(data) {
  this.x = data.x;
  this.y = data.y;
  this.speed = data.speed;
  
  this.id = data.id;
  this.getX = function() {
    return this.x;
  };
  this.getY = function() {
    return this.y;
  };
  this.getAimX = function() {
    return this.aimX;
  };
  this.getAimY = function() {
    return this.aimY;
  };
  this.getAim = function() {
    return {x: this.aimX, y: this.aimY};
  };
  this.getPosition = function() {
    return {x: this.x, y: this.y};
  };
  this.setX = function(newX) {
    this.x = newX;
  };
  this.setY = function(newY) {
    this.y = newY;
  };
  this.setAimX = function(newAimX) {
    this.aimX = newAimX;
  };
  this.setAimY = function(newAimY) {
    this.aimY = newAimY;
  };
  this.setAim = function(newAim) {
    this.aimX = newAim.x;
    this.aimY = newAim.y;
  };
  this.setPosition = function(pos) {
    this.x = pos.x;
    this.y = pos.y;
  };
  this.setTime = function(time) {
    this.t = time;
  };
  this.setUpdated = function(d) {
    this.updated = d;
  };
};

exports.Monster = Monster;