/**
 * Created by jollzy on 01/12/2015.
 */
var AnimState = {
    IDLE: 0,
    PICKED: 1
};
function Snail(textures,self,callback,id) {

    var size = getWindowBounds();
    var snailStateTextures = [];
    for(var i=0; i< textures.length;i++){
        snailStateTextures.push(PIXI.loader.resources[textures[i]].texture);
    }
    //this will not be visible as i have not done animation so the both texture would be the same for now
    this.state = AnimState.IDLE;
    PIXI.extras.MovieClip.call(this,snailStateTextures);

    this.self = self;
    this.calback = callback;
    this.id = id;
};

Snail.prototype = Object.create(PIXI.extras.MovieClip.prototype);
Snail.prototype.constructor = Snail;
Snail.prototype.setSpeed = function(speed){
    this.speed = speed;
};

Snail.prototype.setFinishLineX = function(finishLineX){
    this.finishLineX = finishLineX;
};

Snail.prototype.onButtonDown = function(event){
    if(typeof this.callback === "function"){
        this.callback(this);
    }else{
        throw new Error(this.callback+ " is not a function!");
    }
};

Snail.prototype.resize = function(data){
    // Scale both by X to maintain aspect ratio
    this.scale.x = data.scale.x;
    this.scale.y = data.scale.x;
    // Reposition to center
    this.position.x = data.size.x - this.width;
    this.position.y = data.size.y/2;
};

Snail.prototype.setState = function(state){
    this.state = state;
    this.gotoAndStop(state);
};
