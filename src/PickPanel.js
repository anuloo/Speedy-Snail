/**
 * Created by jollzy on 01/12/2015.
 * pop up panel to pick the runner
 */
//TODO refactor
function PickPanel(texture,itemCreator){

    //label style
    var style = {
        font : '40px Arial',
        fill : '#FFFFFF'
    };

    Panel.call(this,texture);
    this.anchor.x = this.anchor.y = 0.5;

    // Initial positioning
    var size = getWindowBounds();
    this.position.y = this.position.y + Constants.PICK_PANEL_POS.y;

    //label for the picked runner
    this.pickedLabel = itemCreator.createLabel(pickedRunner,style);
    itemCreator.setLabelProperties(0.5,Constants.LABEL_PICKED_RUNNER_POS.x,Constants.LABEL_PICKED_RUNNER_POS.y);

    //adding option buttons to pick the runner

    var optionButtons = [];

    for (var i = 0; i < Constants.AMOUNT_RUNNERS; i++){
        var texture1 = "btn_pick"+(i+1)+"_s";
        var texture2 = "btn_pick"+(i+1);
        optionButtons[i] = itemCreator.create(OptionButton,[texture1, texture2],this,this.pickWinner,i);
        itemCreator.setProperties(0.5,Constants.BUTTON_RUNNERS_POS.x[i],Constants.BUTTON_RUNNERS_POS.y[i]);
        this.addChild(optionButtons[i]);
    }

    //close button
    this.closeButton = itemCreator.create(SimpleButton,["btn_ok", "btn_ok_d"],this,this.closePanel,0);
    itemCreator.setProperties(0.5,Constants.BUTTON_OK_POS.x,Constants.BUTTON_OK_POS.y);
    this.addChild(this.closeButton);

    this.addChild(this.pickedLabel);

    this.radioGroup = function(id){
        // selected or default
        for(var i = 0; i < optionButtons.length; i++){
            optionButtons[i].setState(ButtonState.DISABLED);
        }
        var selected = optionButtons[id];
        pickedRunner = id+1;
        this.pickedLabel.text = pickedRunner.toString();
        selected.setState(ButtonState.ENABLED);

    }

    this.radioGroup(0);

    this.closePanel = this.closePanel.bind(this);
    //this.visible = false;
};

PickPanel.prototype = Object.create(Panel.prototype);
PickPanel.prototype.constructor = PickPanel;

PickPanel.prototype.pickWinner = function(btn){
    btn.self.radioGroup(btn.id);
};

PickPanel.prototype.onTweenComplete = function(isShow){
    if(!isShow){
        Events.Dispatcher.dispatchEvent(new Event(GameEventType.BET_COMPLETED));
    }
    TWEEN.remove(this.tween);
    this.tween = null;
};

PickPanel.prototype.closePanel = function(btn){
    btn.self.show(false);

};

