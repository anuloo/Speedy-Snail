/**
 * Created by jollzy on 01/12/2015.
 * Here we handling all the bet functionality
 */
//TODO break up the class is too long (if i have time)
function BetBar(itemCreator, pickPanel, winPanel){
    PIXI.Container.call(this);
    //label style
    var style = {
        font : '30px Arial',
        fill : '#FFFFFF'
    };

    this.pickPanel = pickPanel;
    this.winPanel = winPanel;

    //this.winPanel.show(true);
    // initial balance
    this.ballanceAmount = Constants.INITIAL_BALANCE;
    this.winningAmount = 0;
    this.betIndex = 0;
    this.betAmount = Constants.BET_VALUES[this.betIndex];
    //this.betIndex++
    // Initial positioning
    var size = getWindowBounds();
    this.position.x = 0;
    this.position.y = 0;
    this.betbarSprite = new PIXI.Sprite(PIXI.loader.resources["betbar"].texture);
    this.betbarSprite.anchor.x = 0.5;
    this.betbarSprite.anchor.y = 0;

    this.betbarSprite.y = this.betbarSprite.y+Constants.BETBAR_POSITION_Y;

    var labelInitialText = [
        this.ballanceAmount,
        this.winningAmount,
        this.betAmount,
    ];
    var labelTypes = [
        Constants.LABEL_BALANCE,
        Constants.LABEL_WINNING,
        Constants.LABEL_BET,
    ];

    //labels
    /**
     * I know could be done just a simple array
     * But ths way you wont get lost what type of label you reference to
     *
     */
    this.labels = {};
    for (var i = 0; i < Constants.AMOUNT_BETBAR_LABELS; i++) {
        this.labels[labelTypes[i]] = itemCreator.createLabel(labelInitialText[i], style);
        itemCreator.setLabelProperties(0.5, Constants.BETBAR_LABELS_POS.x[i], Constants.BETBAR_LABELS_POS.y);
        this.betbarSprite.addChild(this.labels[labelTypes[i]]);
    }

    //buttons
    this.startButton = itemCreator.create(SimpleButton,["btn_start", "btn_start_d"],this,this.startRace,0);
    itemCreator.setProperties(0.5,Constants.START_BUTTON_POS.x,Constants.START_BUTTON_POS.y);
    this.betbarSprite.addChild(this.startButton);

    this.imageLabel = itemCreator.create(ImageLabel,["label_picked1", "label_picked2", "label_picked3"],this,this.startRace,0);
    itemCreator.setProperties(0.5,Constants.IMAGE_LABEL_POS.x, Constants.IMAGE_LABEL_POS.y);
    this.imageLabel.setVisible(false);
    this.startButton.addChild(this.imageLabel);
    this.startButton.setState(ButtonState.DISABLED);

    this.plusButton = itemCreator.create(SimpleButton,["btn_plus", "btn_plus_d"],this,this.onBet,Constants.PLUS_BUTTON_ID);
    itemCreator.setProperties(0.5,Constants.PLUS_BUTTON_POS.x,Constants.PLUS_BUTTON_POS.y);

    this.betbarSprite.addChild(this.plusButton);

    this.minusButton = itemCreator.create(SimpleButton,["btn_minus", "btn_minus_d"],this,this.onBet,Constants.MIN_BUTTON_ID);
    itemCreator.setProperties(0.5,Constants.MINUS_BUTTON_POS.x,Constants.MINUS_BUTTON_POS.y);

    this.betbarSprite.addChild(this.minusButton);
    this.addChild(this.betbarSprite);
    this.minusButton.setState(ButtonState.DISABLED);

    //this little trick takes care of the scope issues
    this.onRaceCompleted = this.onRaceCompleted.bind(this);
    Events.Dispatcher.addEventListener(GameEventType.RACE_COMPLETED,this.onRaceCompleted);
    this.onGameEnabled = this.onGameEnabled.bind(this);
    this.startRace = this.startRace.bind(this);
    this.getWin = this.getWin.bind(this);
    Events.Dispatcher.addEventListener(GameEventType.BET_COMPLETED,this.onGameEnabled);

    this.currentBet = Constants.BET_VALUES[0];



};

BetBar.prototype = Object.create(PIXI.Container.prototype);
BetBar.prototype.constructor = BetBar;

BetBar.prototype.getWin = function(){
    return this.currentBet * 5;
};

BetBar.prototype.startRace = function(btn){
    var self = btn.self;
    //we check a few things if is valid to play
    if(self.ballanceAmount>=self.currentBet && self.ballanceAmount >= Constants.BET_VALUES[0]) {
        self.enableButtons(false);
        self.updateBet(self.betIndex)
        self.imageLabel.setState(pickedRunner-1);
        self.imageLabel.setVisible(true);
        Events.Dispatcher.dispatchEvent(new Event(GameEventType.RACE_START));
    }
};

BetBar.prototype.enableButtons = function(isEnable){
    //TODO make sure the bet button only the relevent get enabled
    if(isEnable==true){
        this.startButton.setState(ButtonState.ENABLED);
        this.minusButton.setState(ButtonState.ENABLED);
        this.plusButton.setState(ButtonState.ENABLED);
    }else {
        this.startButton.setState(ButtonState.DISABLED);
        this.minusButton.setState(ButtonState.DISABLED);
        this.plusButton.setState(ButtonState.DISABLED);
    }
};
//toggles the radio buttons
BetBar.prototype.onBet = function(btn){
    var self = btn.self;
    console.log("is this get called bet values "+ self.minusButton);
    if(btn.id == Constants.PLUS_BUTTON_ID){
        self.betIndex ++;

        if(self.betIndex>=Constants.BET_VALUES.length-1){
            self.plusButton.setState(ButtonState.DISABLED);
            self.minusButton.setState(ButtonState.ENABLED);
        }
        if(self.betIndex<Constants.BET_VALUES.length-1){
            self.minusButton.setState(ButtonState.ENABLED);
        }
    }else{
        self.betIndex--;
        if(self.betIndex<=0) {
            self.plusButton.setState(ButtonState.ENABLED);
            self.minusButton.setState(ButtonState.DISABLED);
        }
        if (self.betIndex>0){
            self.plusButton.setState(ButtonState.ENABLED);
        }
    }
    console.log("is self get called with the right id "+ self.betIndex);
    self.currentBet = Constants.BET_VALUES[self.betIndex];
    self.labels[Constants.LABEL_BET].text = self.currentBet.toString();
};

BetBar.prototype.onGameEnabled = function(){
    this.enableButtons(true)
};

BetBar.prototype.onRaceCompleted = function(event){
    console.log("The winning runner is snail "+ event.data);
    var scope = this;
    //we check if we won
    if(event.data == pickedRunner) {
        this.winPanel.show(true);
        this.updateWinningDelay = setTimeout(function(){scope.updateWinning()},1000);
    }else{
        this.pickPanel.show(true);
    }
    this.imageLabel.setVisible(false);
    //this.enableButtons(true);
};

BetBar.prototype.updateBet = function(index){
    this.currentBet = Constants.BET_VALUES[index];
    this.ballanceAmount-=this.currentBet;
    this.labels[Constants.LABEL_BALANCE].text = this.ballanceAmount.toString();
    Events.Dispatcher.dispatchEvent(new Event(GameEventType.UPDATE_WIN,this.getWin()));
};

BetBar.prototype.updateBalance = function (){
    //TODO add a nice count up effect from winings to ballance
    this.ballanceAmount +=this.getWin();
    this.labels[Constants.LABEL_BALANCE].text = this.ballanceAmount.toString();
    clearTimeout(this.updateBallanceDelay);
    this.labels[Constants.LABEL_WINNING].text = 0;
};

BetBar.prototype.updateWinning = function (){
    var scope = this;
    this.labels[Constants.LABEL_WINNING].text = this.getWin();
    this.updateBallanceDelay = setTimeout(function(){scope.updateBalance()},2000);
    clearTimeout(this.updateWinningDelay);
};