/**
 * Created by jollzy on 01/12/2015.
 */
var TESTCOUNT = 12;
function GameStage(itemCreator){
    PIXI.Container.call(this);
    this.gameStart = false;
    // Initial positioning
    var size = getWindowBounds();
    this.position.x = 0;
    this.position.y = 0;
    this.winner = null;
    this.counter = 0;


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
    this.onBetCompleted = this.onBetCompleted.bind(this);
    Events.Dispatcher.addEventListener(GameEventType.BET_COMPLETED,this.onBetCompleted);

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
                this.winner = this.runners[i]
                this.counter++;
               /* switch(this.winner.id){
                    case 1:
                        console.log(this.counter+"  winner snail ---- "+ this.winner.id);
                        break;
                    case 2:
                        console.log(this.counter+"  winner snail ------- "+ this.winner.id);
                        break;
                    case 3:
                        console.log(this.counter+"  winner snail ---------- "+ this.winner.id);
                        break;
                }*/

                this.onResult();
            }
        }
    }
};

GameStage.prototype.resetRunners = function(){
    for(var i = 0; i < this.runners.length; i++) {
        this.runners[i].position.x = (Constants.RUNNERS_START_POS.x[i]);
        this.runners[i].setState(AnimState.IDLE);
    }
    if(this.winner.id != pickedRunner/* && this.counter>=TESTCOUNT*/) {

        Events.Dispatcher.dispatchEvent(new Event(GameEventType.RACE_COMPLETED,this.winner.id));
    }
    clearTimeout(this.resetRunnersDelay);
   /* if(this.counter>=TESTCOUNT){
        this.counter = 0;
    }else{

        this.onRaceStart()
    }*/
};

GameStage.prototype.onRaceStart = function(){
    //console.log("Game start");

    var scope = this;
    var count = 1;
    var speed = 0.2;
    this.generateSpeed = function(){
        //console.log(count+" ----------------------------------------");
        for(var i = 0; i < scope.runners.length; i++) {
            var randomnumber = Math.floor(Math.random() * 10);
            speed = Constants.SPEEDS[i][randomnumber];
            scope.runners[i].setSpeed(speed);
            //console.log("snail"+(i+1)+" speed: "+ speed);
        }
        count++;

    }
    this.generateSpeed();
    this.interval = setInterval(function(){scope.generateSpeed()},5000);

    //this.runners[1].setSpeed(15); testing only
    this.gameStart = true;
    loopSound(snailMove);
};

GameStage.prototype.onResult = function(){
    snailMove.stop();
    var scope = this;
    var delay = 1000;
    if(this.winner.id == pickedRunner/* && this.counter>=TESTCOUNT*/) {
        soundManager.play("win");
        delay = 2000;
        Events.Dispatcher.dispatchEvent(new Event(GameEventType.RACE_COMPLETED,this.winner.id));
    }else{
        soundManager.play("lose");
    }
    if(this.winner!=null){
        this.resetRunnersDelay = setTimeout(function(){scope.resetRunners()},delay);
    }
};

GameStage.prototype.onBetCompleted = function(){
    this.runners[pickedRunner-1].setState(AnimState.PICKED);
};