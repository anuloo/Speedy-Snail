/**
 * Created by jollzy on 01/12/2015.
 * Here we handling all the bet functionality
 */

function BetBar(itemCreator){
    PIXI.Container.call(this);
    //label style
    var style = {
        font : '30px Arial',
        fill : '#FFFFFF'
    };

    // initial balance
    this.ballanceAmount = Constants.INITIAL_BALLANCE;
    this.winningAmount = 0;
    this.betIndex = 0;
    this.betAmount = Constants.BET_VALUES[this.betIndex];
    this.betIndex++
    // Initial positioning
    var size = getWindowBounds();
    this.position.x = 0;
    this.position.y = 0;
    console.log("this.betIndex:    "+this.betIndex);

    this.betbarSprite = new PIXI.Sprite(PIXI.loader.resources["betbar"].texture);
    this.betbarSprite.anchor.x = 0.5;
    this.betbarSprite.anchor.y = 0;

    this.betbarSprite.y = this.betbarSprite.y+Constants.BETBAR_POSITION_Y;

    /**
     * TODO must clean up this mess below
     */
    //Ballance label
    this.labelBalance = itemCreator.createLabel(this.ballanceAmount,style);
    itemCreator.setLabelProperties(0.5,Constants.LABEL_BALLANCE_X,Constants.LABEL_POSITION_Y);
    this.betbarSprite.addChild(this.labelBalance);

    //Winnings label;
    this.labelWinning = itemCreator.createLabel(this.winningAmount,style);
    itemCreator.setLabelProperties(0.5,Constants.LABEL_WINNINGS_X,Constants.LABEL_POSITION_Y);
    this.betbarSprite.addChild(this.labelWinning);

    //BetBet label
    this.labelBet = itemCreator.createLabel(this.betAmount,style);
    itemCreator.setLabelProperties(0.5,Constants.LABEL_BET_X*-1,Constants.LABEL_POSITION_Y);
    this.betbarSprite.addChild(this.labelBet);

    //buttons
    this.startButton = itemCreator.create(SimpleButton,["btn_start", "btn_start_d"],this,this.startRace,0);
    itemCreator.setProperties(0.5,Constants.START_BUTTON_X,Constants.START_BUTTON_Y);
    this.betbarSprite.addChild(this.startButton);
    //this.startButton.setState(ButtonState.DISABLED);

    this.plusButton = itemCreator.create(SimpleButton,["btn_plus", "btn_plus_d"],this,this.onBet,Constants.PLUSS_BUTTON_ID);
    itemCreator.setProperties(0.5,Constants.BET_BUTTON_X,Constants.PLUS_BUTTON_Y);

    this.betbarSprite.addChild(this.plusButton);


    this.minusButton = itemCreator.create(SimpleButton,["btn_minus", "btn_minus_d"],this,this.onBet,Constants.MIN_BUTTON_ID);
    itemCreator.setProperties(0.5,Constants.BET_BUTTON_X,Constants.MINUS_BUTTON_Y);

    this.betbarSprite.addChild(this.minusButton);
    this.addChild(this.betbarSprite);
    this.minusButton.setState(ButtonState.DISABLED);

    //this little trick takes care of the scope issues
    this.onRaceCompleted = this.onRaceCompleted.bind(this);
    this.startRace = this.startRace.bind(this);
    this.getWin = this.getWin.bind(this);
    Events.Dispatcher.addEventListener(GameEventType.RACE_COMPLETED,this.onRaceCompleted);

    this.currentBet = Constants.BET_VALUES[0];

    stage.addChild(this);

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
    console.log("is this get called bet values "+ self.minusButton)
    if(btn.id == Constants.PLUSS_BUTTON_ID){
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
    self.labelBet.text = self.currentBet.toString();
};

BetBar.prototype.onRaceCompleted = function(event){
    console.log("The winning runner is snail "+ event.data);
    var scope = this;
    //we check if we won
    if(event.data == pickedRunner) {
        this.labelWinning.text = this.getWin();
        this.updateBallanceDelay = setTimeout(function(){scope.updateBalance()},1000);
        //TODO play win sound
        console.log("YEEPEE I WIN " + event.data)
    }else{
        //TODO play loose sound
        //TODO show pick runner panel;
        console.log("OH NOOOOO " + event.data)
    }
    this.enableButtons(true);
};

BetBar.prototype.updateBet = function(index){
    this.currentBet = Constants.BET_VALUES[index];
    this.ballanceAmount-=this.currentBet;
    this.labelBalance.text = this.ballanceAmount.toString();
};

BetBar.prototype.updateBalance = function (){
    //TODO add a nice count up effect from winings to ballance
    this.ballanceAmount +=this.getWin();
    this.labelBalance.text = this.ballanceAmount.toString();
    clearTimeout(this.updateBallanceDelay);
    //TODO show pick runner panel;
    this.labelWinning.text = 0;
};

BetBar.prototype.resize = function(data){
    var size = getWindowBounds();
    console.log("what is the size: "+size.y);
    this.scale.x = data.scale.x;
    this.scale.y = data.scale.x;
    this.position.x = size.x/2;
    this.position.y = size.y/2;
};
