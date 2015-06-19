var Monster = function(data) {
  var x = data.x,
    y = data.y,
    r = data.r,
    aimX, aimY;
  
  this.id = data.id;
  this.getX = function() {
    return x;
  };
  this.getY = function() {
    return y;
  };
  this.getR = function() {
    return r;
  };
  this.getAimX = function() {
    return aimX;
  };
  this.getAimY = function() {
    return aimY;
  };
  this.getAim = function() {
    return {x: aimX, y: aimY};
  };
  this.setX = function(newX) {
    x = newX;
  };
  this.setY = function(newY) {
    y = newY;
  };
  this.setR = function(newR) {
    r = newR;
  };
  this.setAimX = function(newAimX) {
    aimX = newAimX;
  };
  this.setAimY = function(newAimY) {
    aimY = newAimY;
  };
  this.setAim = function(newAim) {
    aimX = newAim.x;
    aimY = newAim.y;
  };
};

exports.Monster = Monster;