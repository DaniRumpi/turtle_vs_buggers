var GameOver = cc.LayerColor.extend({
  _won: false,
  onEnter: function() {
    this._super();
    var message;
    if (this._won) {
      message = "You Win!";
    } else {
      message = "You fail :[";
    }
  
    var label = cc.LabelTTF.create(message, "Arial", 32);
    label.setColor(cc.color(0,0,0));
    label.setPosition(_size.width/2, _size.height/2);
    this.addChild(label);
  
    this.runAction(cc.Sequence.create(
      cc.DelayTime.create(3),
      cc.CallFunc.create(function(node) {
        cc.director.runScene(new cc.TransitionFade(2, new SysMenu()));
      }, this)
    ));
  }
});
 
GameOver.create = function (won) {
  var sg = new GameOver();
  sg._won = won;
  if (sg && sg.init(cc.color(255,255,255, 0))) {
    return sg;
  }
  return null;
};
 
GameOver.newScene = function (won) {
  var scene = cc.Scene.create();
  var layer = GameOver.create(won);
  scene.addChild(layer);
  return scene;
};