HelperMovements = function() {
  this.calcDistance = function (v1, v2) {
    var pow1 = (v1.x - v2.x) * (v1.x - v2.x);
    var pow2 = (v1.y - v2.y) * (v1.y - v2.y);
    return Math.sqrt(pow1 + pow2);
  };
  this.calcTime = function (dist, speed) {
    return (dist / speed) * 1000;
  };
  this.getMin = function(arr) {
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
};

exports.HelperMovements = HelperMovements;