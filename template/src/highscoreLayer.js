var Highscore = cc.Layer.extend({
  ctor: function (data) {
    this.data = data || {};
    this._super();
    this.init();
  },
  init: function () {
    this._super();
    
    if (this.data.bg) {
      var bg = new cc.LayerColor(this.data.bg);
      this.addChild(bg);
    }
    
    var title = new cc.MenuItemFont(this.data.title || "== Highscores ==");
    this.menu = new cc.Menu(title);
    if (this.data.color) {
      this.menu.setColor(this.data.color);
    }
    
    if (this.data.highscores) {
      this.setListHighscoresMultiplayer();
    } else {
      this.setListHighscores();
    }
    
    this.menu.alignItemsVerticallyWithPadding(40);
    this.addChild(this.menu);
    this.addQuitMenuItem();
    _layer = this;
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
  setListHighscoresMultiplayer: function() {
    var str, i, limit;
    var hs = this.data.highscores;
    limit = hs.length > 5 ? 5 : hs.length;
    for (i = 0; i < limit; i++) {
      if (this.data.id === hs[i].id) {
        str = new cc.MenuItemFont("You: " + hs[i].score);
      } else {
        str = new cc.MenuItemFont("Player " + (i + 1) + ": " + hs[i].score);
      }
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

Highscore.scene = function (data) {
  var scene = new cc.Scene();
  var layer = new Highscore(data);
  scene.addChild(layer);
  _layer = layer;
  return scene;
};