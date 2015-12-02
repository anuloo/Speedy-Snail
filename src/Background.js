/**
 * Created by jollzy on 01/12/2015.
 *
 * Could be removed in the future
 * initially the ide was to make it prallax
 * but the game does not require
 */
function Background(){
    PIXI.Sprite.call(this,PIXI.loader.resources["background"].texture);
    //center the image
    this.anchor.x = this.anchor.y = 0.5;
};

Background.prototype = Object.create(PIXI.Sprite.prototype);
Background.prototype.constructor = Background;

