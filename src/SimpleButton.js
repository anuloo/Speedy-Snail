/**
 * Created by jollzy on 01/12/2015.
 */

function SimpleButton(states,self,onClick,id) {


    var size = getWindowBounds();
    this.state = ButtonState.ENABLED;
    var buttonStateTextures = [];
    for(var i=0; i< states.length;i++){
        buttonStateTextures.push(PIXI.loader.resources[states[i]].texture);
    }

    this.buttonMode = true;
    this.interactive = true;

    PIXI.extras.MovieClip.call(this,buttonStateTextures);
    this.on('mousedown', this.onButtonDown);
    this.on('touchstart', this.onButtonDown);

    this.self = self;
    this.onClick = onClick;
    this.id = id;
};
SimpleButton.prototype = Object.create(PIXI.extras.MovieClip.prototype);
SimpleButton.prototype.constructor = SimpleButton;

SimpleButton.prototype.onButtonDown = function(event){
    if(typeof this.onClick === "function"){
        this.onClick(this);
    }else{
        throw new Error(this.onClick+ " is not a function!");
    }
};

SimpleButton.prototype.enabled = function(isEnabled){
    this.interactive = isEnabled;
    this.buttonMode = isEnabled
};

SimpleButton.prototype.resize = function(data){
    // Scale both by X to maintain aspect ratio
    this.scale.x = data.scale.x;
    this.scale.y = data.scale.x;
    // Reposition to center
    this.position.x = data.size.x - this.width;
    this.position.y = data.size.y/2;
};

SimpleButton.prototype.setState = function(state){
    this.state = state;
    this.gotoAndStop(state);
    this.enabled(true);
    if(state==ButtonState.DISABLED){
        this.enabled(false);
    }
};
