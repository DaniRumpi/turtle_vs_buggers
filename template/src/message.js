var Message = cc.LayerColor.extend({
  _message: false,
  onEnter:function () {
    this._super();
    var centerPos = cc.p( _size.width/2, _size.height/2 );
  
    var label = cc.LabelTTF.create(this._message, "Arial", 32);
    label.setColor(cc.color(0,0,0));
    label.setPosition(_size.width/2, _size.height/2);
    this.addChild(label);
  
    this.runAction(cc.Sequence.create(
      cc.DelayTime.create(4),
      cc.CallFunc.create(function(node) {
        cc.director.runScene(new cc.TransitionFade(1, new Game()));
      }, this)
    ));

  }
});
 
Message.create = function (message) {
  var sg = new Message();
  sg._message = message;
  if (sg && sg.init(cc.color(255,255,255, 0))) {
    return sg;
  }
  return null;
};
 
Message.newScene = function (message) {
  var scene = cc.Scene.create();
  var layer = Message.create(message);
  scene.addChild(layer);
  return scene;
};