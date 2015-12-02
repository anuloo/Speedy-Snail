/**
 * Created by jollzy on 01/12/2015.
 * Extends the SimpleButton
 * Used for the radio buttons
 */

function OptionButton(states,self,onClick,id){
    SimpleButton.call(this,states,self,onClick,id);
    this.enabled(true);
};
OptionButton.prototype = Object.create(SimpleButton.prototype);
OptionButton.prototype.constructor = OptionButton;

OptionButton.prototype.setState = function(state){
    this.state = state;
    this.gotoAndStop(state);
};
