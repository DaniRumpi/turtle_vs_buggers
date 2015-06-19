var SysMenu = cc.Layer.extend({
  ctor: function () {
    this._super();
    this.init();
  },
  init: function () {
    this._super();
    var menuItem1 = new cc.MenuItemFont("New Game", this.onNewGame);
    var menuItem2 = new cc.MenuItemFont("Multiplayer", this.onMultiplayer);
    var menuItem3 = new cc.MenuItemFont("Highscores", this.onHighscores);
    // var menuItem3 = new cc.MenuItemFont("Settings", this.onSettings);
    var menuItem4 = new cc.MenuItemFont("About", this.onAbout);

    var menu = new cc.Menu(menuItem1, menuItem2, menuItem3, menuItem4);
    menu.alignItemsVerticallyWithPadding(50);
    this.addChild(menu);
  },
  onNewGame: function () {
    cc.director.runScene(new cc.TransitionFade(1, new Game()));
    //load resources
    // cc.LoaderScene.preload(g_maingame, function () {
    //   cc.audioEngine.stopMusic();
    //   cc.audioEngine.stopAllEffects();
    //   var scene = new cc.Scene();
    //   scene.addChild(new GameLayer());
    //   scene.addChild(new GameControlMenu());
    //   cc.director.runScene(new cc.TransitionFade(1.2, scene));
    // }, this);
  },
  onMultiplayer: function () {
    cc.director.runScene(new cc.TransitionFade(1, new Game(true)));
  },
  onSettings: function () {
    // this.onButtonEffect();
    // var scene = new cc.Scene();
    // scene.addChild(new SettingsLayer());
    // cc.director.runScene(new cc.TransitionFade(1.2, scene));
  },
  onAbout: function () {
    cc.director.runScene(new cc.TransitionFade(0.5, new About()));
    // this.onButtonEffect();
    // var scene = new cc.Scene();
    // scene.addChild(new AboutLayer());
    // cc.director.runScene(new cc.TransitionFade(1.2, scene));
  }
});

SysMenu.scene = function () {
  var scene = new cc.Scene();
  var layer = new SysMenu();
  scene.addChild(layer);
  _layer = layer;
  return scene;
};