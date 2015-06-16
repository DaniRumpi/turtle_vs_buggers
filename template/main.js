cc.game.onStart = function(){
  if (!cc.sys.isNative && document.getElementById("cocosLoading")) {
    document.body.removeChild(document.getElementById("cocosLoading"));
  }

  _size = cc.size(800, 480);
  var screenSize = cc.view.getFrameSize();
  
  cc.SPRITE_DEBUG_DRAW =  0;

  if (!cc.sys.isNative && screenSize.height < 800) {
    _size = cc.size(800, 480);
    cc.loader.resPath = "res/Normal";
  } else {
    cc.loader.resPath = "res/HD";
  }
  cc.view.setDesignResolutionSize(_size.width, _size.height, cc.ResolutionPolicy.SHOW_ALL);
  cc.view.resizeWithBrowserSize(true);

  //load resources
  cc.LoaderScene.preload(g_resources, function () {
    _layer = new SysMenu();
    cc.director.runScene(_layer);
  }, this);
};
cc.game.run();