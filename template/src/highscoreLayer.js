var Highscore = cc.Layer.extend({
  ctor: function () {
    this._super();
    this.init();
  },
  init: function () {
    this._super();
    var title = new cc.MenuItemFont("== Highscores ==");
    this.menu = new cc.Menu(title);
    
    this.setListHighscores();
    
    this.menu.alignItemsVerticallyWithPadding(50);
    this.addChild(this.menu);
    this.addQuitMenuItem();
  },
  getHighscores: function() {
    try {
      var hs = JSON.parse(cc.sys.localStorage.getItem("highscores"));
      if (typeof hs.push !== "function") {
        hs = [];
      }
      return hs;
    } catch(e) {
      return [];
    }
  },
  sortAndSplice: function(highscores) {
    highscores.sort(function(a, b) { return b - a; });
    highscores.splice(5, highscores.length);
  },
  setListHighscores: function() {
    var str, i;
    var hs = this.getHighscores();
    this.sortAndSplice(hs);
    for (i = 0; i < hs.length; i++) {
      str = new cc.MenuItemFont((i + 1) + ". " + hs[i]);
      this.menu.addChild(str);
    }
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

Highscore.scene = function () {
  var scene = new cc.Scene();
  var layer = new Highscore();
  scene.addChild(layer);
  _layer = layer;
  return scene;
};