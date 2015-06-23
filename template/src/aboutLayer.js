var About = cc.Layer.extend({
  ctor: function () {
    this._super();
    this.init();
  },
  init: function () {
    this._super();
    
    var about = new cc.LabelTTF('* Turtles vs Buggers\nThis game takes place in an apocalyptic event that occurred about a thousand years after the extinction of the human species (the cause of extinction is unknown). The only species that exists are the Turtles and their archenemies, the Buggers. These wicked insects exist before time began and come from alternate universes.\n\n* License:\nThis project utilizes many features from Cocos2d-html5 engine. This project is licensed under GPL. \n \n Author: Robin Giles Ribera', 'Arial', 21, cc.size(_size.width * 0.85, 0), cc.TEXT_ALIGNMENT_LEFT);
    about.attr({
      x: _size.width / 2,
      y: _size.height / 2 + 30,
      anchorX: 0.5,
      anchorY: 0.5
    });
    this.addChild(about);
    
    this.addQuitMenuItem();
  },
  addQuitMenuItem: function() {
    var closeItem = new cc.MenuItemImage(res.CloseNormal_png, res.CloseSelected_png, this.onQuit);
    closeItem.setPosition(cc.p(_size.width - 20, _size.height - 20));
    closeItem.setAnchorPoint(cc.p(0.5, 0.5));
    var menu = new cc.Menu(closeItem);
    menu.setPosition(cc.p());
    this.addChild(menu, 4);
  },
  onQuit: function() {
    cc.director.runScene(new SysMenu());
  }
});

About.scene = function () {
  var scene = new cc.Scene();
  var layer = new About();
  scene.addChild(layer);
  _layer = layer;
  return scene;
};