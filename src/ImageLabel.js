/**
 * Created by jollzy on 01/12/2015.
 *
 * Switching state shows the player what is their
 * picked runner, it resides on the start button
 * I know its not the best place but i am running out of spaces on the bet bar
 */
function ImageLabel(states) {
    var size = getWindowBounds();
    this.state = pickedRunner-1;
    var stateTextures = [];
    for(var i=0; i< states.length;i++){
        stateTextures.push(PIXI.loader.resources[states[i]].texture);
    }

    PIXI.extras.MovieClip.call(this,stateTextures);
};

ImageLabel.prototype = Object.create(PIXI.extras.MovieClip.prototype);
ImageLabel.prototype.constructor = ImageLabel;

ImageLabel.prototype.setVisible = function(isVisible){
    this.visible=isVisible;
};

ImageLabel.prototype.setState = function(state){
    this.state = state;
    this.gotoAndStop(state);
};
