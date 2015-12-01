/**
 * Created by jollzy on 01/12/2015.
 */
function Background(){
    PIXI.Sprite.call(this,PIXI.loader.resources["background"].texture);
    this.anchor.x = this.anchor.y = 0.5;

    // Initial positioning
    var size = getWindowBounds();
    this.position.x = size.x/2;
    this.position.y = size.y/2

    stage.addChild(this);
};

Background.prototype = Object.create(PIXI.Sprite.prototype);
Background.prototype.constructor = Background;

Background.prototype.resize = function(data){
    var size = getWindowBounds();
    this.scale.x = data.scale.x;
    this.scale.y = data.scale.x;
    this.position.x = size.x/2;
    this.position.y = size.y/2;
};

Background.prototype.getBounds = function() {
    return new Rectangle(this.position.x, this.position.y, this.width, this.height);
};
