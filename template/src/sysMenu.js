var SysMenu = cc.Layer.extend({
  ctor: function () {
    this._super();
    this.init();
  },
  init: function () {
    this._super();
    var menuItem1 = new cc.MenuItemFont("Start", this.onNewGame);
    var menuItem2 = new cc.MenuItemFont("Highscores", this.onHighscores);
    var menuItem3 = new cc.MenuItemFont("Settings", this.onSettings);
    var menuItem4 = new cc.MenuItemFont("About", this.onAbout);

    var menu = new cc.Menu(menuItem1, menuItem2, menuItem3, menuItem4);
    menu.alignItemsVerticallyWithPadding(50);
    this.addChild(menu);
  },
  onNewGame: function () {
    cc.log('new Game');
    cc.director.runScene(new cc.TransitionFade(1, new Game()));
    cc.log('OK');
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
  },
  update: function () {
    // if (this._ship.y > 750) {
    //   this._ship.x = Math.random() * _size.width;
    //   this._ship.y = 10;
    //   this._ship.runAction(cc.moveBy(
    //     parseInt(5 * Math.random(), 10),
    //     cc.p(Math.random() * _size.width, this._ship.y + 750)
    //   ));
    // }
  },
  onButtonEffect: function () {
    // if (MW.SOUND) {
    //   var s = cc.audioEngine.playEffect(res.buttonEffet_mp3);
    // }
  }
});

SysMenu.scene = function () {
  var scene = new cc.Scene();
  var layer = new SysMenu();
  scene.addChild(layer);
  return scene;
};