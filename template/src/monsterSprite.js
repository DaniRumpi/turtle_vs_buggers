var MonsterSprite = cc.Sprite.extend({
  _currentRotation: 0,
  isMoving: false,
  speed: 70.0,
  _key_right: false,
  _key_down: false,
  onEnter: function() {
    cc.log("init! monster", this.getScale());
    this._super();
    this._ratio = this.getContentSize().width * this.getScale() / 2.3;
  },
  update: function (dt) {
    if (!this.isMoving) {
      this.getAim();
      this.setRotationAim();
      this.move();
    }
  },
  getAim: function() {
    // Update Params
    this._aimX = parseInt(Math.random() * 800);
    this._aimY = parseInt(Math.random() * 480);
  },
  setRotationAim: function() {
    var pos = this.getPosition();
    var angle = Math.atan2(this._aimX - pos.x, this._aimY - pos.y);

    angle = angle * (180 / Math.PI);
    this._currentRotation = angle;

    this.setRotation(this._currentRotation);
  },
  move: function () {
    this.isMoving = true;
    var pos = this.getPosition();
    var aim = cc.p(this._aimX, this._aimY);
    var dist = cc.pDistance(aim, pos);
    var time = dist / this.speed;
    var actionMove = cc.MoveTo.create(time, aim);
    var actionMoveDone = cc.CallFunc.create(function(node) {
      this.isMoving = false;
    }, this);
    _monster.runAction(cc.Sequence.create(actionMove, actionMoveDone));
  },
  updateMove: function() {
    // this._aimX = parseInt(Math.random() * 400);
    // this._aimY = parseInt(Math.random() * 320);
    // var angle = Math.atan2(this._aimX - 400, this._aimY - 320);

    // angle = angle * (180 / Math.PI);
    // this._currentRotation = angle;
  }
});












var MonsterSprite_bk = cc.Sprite.extend({
  _currentRotation: 0,
  _aimX: null, _aimY: null, _size: null,
  _getSize: function() {
    if (!this._size) {
      this._size = window._size;
    }
    return this._size;
  },
  onEnter: function() {
    cc.log("Monster onEnter");
    this._size = window._size;
    this._setup();
  },
  // update: function (dt) {
  //   this.draw();
  //   //this.move();
  //   //this.setRotation(this._currentRotation);
  //   // cc.log("Update Monster");
  //   // if (!this.isClose()) {
  //   //   this.handleAim();
  //   //   this.handleRandomRotation();
  //   //   this.move();
  //   // }
  // },
  handleAim: function () {
    this._aimX = parseInt(Math.random() * this._getSize().width);
    this._aimY = parseInt(Math.random() * this._getSize().height);
    cc.log(this._aimX, this._aimY);
    cc.log(this.getContentSize());
  },
  handleRandomRotation:function() {
    var angle = Math.atan2(this._aimX - this._getSize().width, this._aimY - this._getSize().height);

    angle = angle * (180 / Math.PI);
    this._currentRotation = angle;
  },
  _move: function () {
    this.runAction(cc.MoveBy.create(10, cc.p(this._aimX, this._aimY)));
    cc.log('move');
  },
  _isClose: function() {
    if (!this._aimX) { return false; }
    var pos = this.getPosition();
    return pos.x - this._aimX < 20 && pos.y - this._aimY < 20;
  },
  _setup: function() {
    cc.log('setup');
    var minY = this.getContentSize().height / 2;
    var maxY = this._size.height - this.getContentSize().height / 2;
    var rangeY = maxY - minY;
    var actualY = (Math.random() * rangeY) + minY;
    var actualX = this.getContentSize().width;
    
    this.setPosition(new cc.Point(actualX, actualY));
    // this.setScale(0.4);
    this.setTag(1);
  },
  updateMove: function() {
    // this.scheduleUpdate();
    // this.handleAim();
    // this.handleRandomRotation();
    // this.move();
    this._aimX = parseInt(Math.random() * this._getSize().width);
    this._aimY = parseInt(Math.random() * this._getSize().height);
    cc.log(this._aimX, this._aimY);
    cc.log(this.getContentSize());
    var angle = Math.atan2(this._aimX - this._getSize().width, this._aimY - this._getSize().height);

    angle = angle * (180 / Math.PI);
    this._currentRotation = angle;
  }
});

