var BackgroundSky = cc.Sprite.extend({
  ctor: function (bg, color) {
    this._super(bg);
    var rect = cc.rect(0, 1, _size.width, _size.height);
    this.setTextureRect(rect);
    this.anchorX = 0;
    this.anchorY = 0;
    this.scale = 1;
    this.color = HELPER_COLORS[color];
  }
});

BackgroundSky.create = function (bg, color) {
  var background = new BackgroundSky(bg, color);
  _layer.addChild(background, -5);
  return background;
};