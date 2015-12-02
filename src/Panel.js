/**
 * Created by jollzy on 02/12/2015.
 */
/**
 * Created by jollzy on 01/12/2015.
 * abstract panel to be extended
 */

function Panel(texture,itemCreator){

    if (this.constructor === Panel) {
        throw new Error("Can't instantiate abstract class!");
    }
    //label style
    var style = {
        font : '40px Arial',
        fill : '#FFFFFF'
    };

    PIXI.Sprite.call(this,PIXI.loader.resources[texture].texture);
    this.anchor.x = this.anchor.y = 0.5;

    // Initial positioning
    var size = getWindowBounds();
    this.position.y = this.position.y + Constants.PICK_PANEL_POS.y;

    //this.onTweenComplete = this.onTweenComplete.bind(this);

    this.show = function(isShow){
        this.tween  = new TWEEN.Tween(this.position);
        var tweenTo = {};
        var scope = this;

        if(isShow==true){

            tweenTo = {y:Constants.PICK_PANEL_POS.y};
        }else{
            tweenTo = {y:400};
        }
        this.tween.to(tweenTo,500);
        this.tween.start();
        this.tween.onComplete(function() {
            scope.onTweenComplete(isShow);
        });
    };

};

Panel.prototype = Object.create(PIXI.Sprite.prototype);
Panel.prototype.constructor = Panel;

Panel.prototype.onTweenComplete = function(isShow){
    throw new Error("Must override!");
};


