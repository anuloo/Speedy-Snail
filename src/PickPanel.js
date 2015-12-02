/**
 * Created by jollzy on 01/12/2015.
 * pop up panel to pick the runner
 */
//TODO refactor
function PickPanel(itemCreator){

    //label style
    var style = {
        font : '40px Arial',
        fill : '#FFFFFF'
    };

    PIXI.Sprite.call(this,PIXI.loader.resources["pick_panel"].texture);
    this.anchor.x = this.anchor.y = 0.5;

    // Initial positioning
    var size = getWindowBounds();
    this.position.x = 0;
    this.position.y = 0;

    //label for the picked runner
    this.pickedLabel = itemCreator.createLabel(pickedRunner,style);
    itemCreator.setLabelProperties(0.5,Constants.LABEL_PICKED_RUNNER_X,Constants.LABEL_PICKED_RUNNER_Y);


    //adding option buttons to pick the runner

    this.runner3Button = itemCreator.create(OptionButton,["btn_pick3_s", "btn_pick3"],this,this.pickWinner,Constants.BUTTON_RUNNER3_ID);
    itemCreator.setProperties(0.5,Constants.BUTTON_RUNNER3_X,Constants.BUTTON_RUNNER1_Y);
    this.addChild(this.runner3Button);

    this.runner2Button = itemCreator.create(OptionButton,["btn_pick2_s", "btn_pick2"],this,this.pickWinner,Constants.BUTTON_RUNNER2_ID);
    itemCreator.setProperties(0.5,Constants.BUTTON_RUNNER2_X,Constants.BUTTON_RUNNER2_Y);
    this.addChild(this.runner2Button);

    this.runner1Button = itemCreator.create(OptionButton,["btn_pick1_s", "btn_pick1"],this,this.pickWinner,Constants.BUTTON_RUNNER1_ID);
    itemCreator.setProperties(0.5,Constants.BUTTON_RUNNER1_X,Constants.BUTTON_RUNNER1_Y);
    this.addChild(this.runner1Button);

    //close button
    this.closeButton = itemCreator.create(SimpleButton,["btn_ok", "btn_ok_d"],this,this.closePanel,0);
    itemCreator.setProperties(0.5,Constants.BUTTON_OK_X,Constants.BUTTON_OK_Y);
    this.addChild(this.closeButton);

    this.addChild(this.pickedLabel);

    var optionButtons = [this.runner1Button,this.runner2Button,this.runner3Button];


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
};

PickPanel.prototype = Object.create(PIXI.Sprite.prototype);
PickPanel.prototype.constructor = PickPanel;

PickPanel.prototype.pickWinner = function(btn){
    btn.self.radioGroup(btn.id);
};

PickPanel.prototype.closePanel = function(btn){
    btn.self.visible = false;
    Events.Dispatcher.dispatchEvent(new Event(GameEventType.BET_COMPLETED));
};
