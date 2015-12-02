/**
 * Created by jollzy on 01/12/2015.
 */

function GameStage(itemCreator){
    PIXI.Container.call(this);
    this.gameStart = false;
    // Initial positioning
    var size = getWindowBounds();
    this.position.x = 0;
    this.position.y = 0;

    //holds the runners instances (snails)
    this.runners = [];

    //create the runners(snails)
    for (var i = 0; i < Constants.AMOUNT_RUNNERS; i++){
        var texture1 = "snail"+(i+1);
        var texture2 = texture1 + "_s";
        this.runners[i] = itemCreator.create(Snail,[texture1, texture2],this,this.onResult,i+1);
        itemCreator.setProperties(0.5,Constants.RUNNERS_START_POS.x[i],Constants.RUNNERS_START_POS.y[i]);
        this.runners[i].setFinishLineX(Constants.RUNNER_FINISH_LINE_POS.x[i]);
        this.addChild(this.runners[i]);
    }

    this.onRaceStart = this.onRaceStart.bind(this);
    this.onResult= this.onResult.bind(this);

    Events.Dispatcher.addEventListener(GameEventType.RACE_START,this.onRaceStart);

};

GameStage.prototype = Object.create(PIXI.Container.prototype);
GameStage.prototype.constructor = GameStage;

GameStage.prototype.gameLoop = function(){
    if(this.gameStart==true) {
        // Move the snail
        for(var i = 0; i < this.runners.length; i++){
            this.runners[i].position.x += this.runners[i].speed;

            // checking if passed the finish line
            if(this.runners[i].position.x > this.runners[i].finishLineX){
                clearInterval(this.interval);
                this.gameStart = false;
                this.onResult(this.runners[i]);
            }
        }
    }
};

GameStage.prototype.resetRunners = function(){
    for(var i = 0; i < this.runners.length; i++) {
        this.runners[i].position.x = (Constants.RUNNERS_START_POS.x[i]);
        this.runners[i].setState(AnimState.IDLE);
    }
};

GameStage.prototype.onRaceStart = function(){
    console.log("Game start");

    var scope = this;
    this.generateSpeed = function(){
        for(var i = 0; i < scope.runners.length; i++) {
            var randomnumber = Math.floor(Math.random() * 10);
            scope.runners[i].setSpeed(Constants.SPEEDS[randomnumber]);
        }
    }

    this.runners[pickedRunner-1].setState(AnimState.PICKED);
    this.generateSpeed();
    this.interval = setInterval(function(){scope.generateSpeed()},1000);
    this.gameStart = true;
    loopSound(snailMove);
};

GameStage.prototype.onResult = function(runner){
    Events.Dispatcher.dispatchEvent(new Event(GameEventType.RACE_COMPLETED,runner.id));
    runner.setState(AnimState.IDLE);
    snailMove.stop();
    this.resetRunners();
};