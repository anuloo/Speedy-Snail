/**
 * Created by jollzy on 01/12/2015.
 * As we not using stage as a grouping or a container type
 * GameStage is another container which holds the elements
 * for the race (snails and the game loop)
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
        itemCreator.setProperties(0.5,Constants.RUNNERS_START_X[i],Constants.RUNNERS_START_Y[i]);
        /**
         * TODO add different type of finish line position  as the game a bit perspective
         */
        this.runners[i].setFinishLineX(Constants.RUNNER_FINISH_LINE_X);
    }
    //adding the runners in the reverse order
    this.addChild(this.runners[2]);
    this.addChild(this.runners[1]);
    this.addChild(this.runners[0]);

    stage.addChild(this);

    this.onRaceStart = this.onRaceStart.bind(this);
    this.onResult= this.onResult.bind(this);
    animate = animate.bind(this);
    Events.Dispatcher.addEventListener(GameEventType.RACE_START,this.onRaceStart);
    requestAnimationFrame(animate );

    //start test
    var scope = this;
    this.delayRaceStart = setTimeout(function(){
        //this will fires from the bet control once the user ready
        Events.Dispatcher.dispatchEvent(new Event(GameEventType.RACE_START));
    },2000);


};

GameStage.prototype = Object.create(PIXI.Container.prototype);
GameStage.prototype.constructor = GameStage;

function animate() {
    this.race();
    requestAnimationFrame(animate);
    renderer.render(stage);
};

GameStage.prototype.race = function(){
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
        this.runners[i].position.x = (Constants.RUNNERS_START_X[i]);
        this.runners[i].setState(AnimState.IDLE);
    }
};

GameStage.prototype.onRaceStart = function(){
    console.log("Game start");

    var scope = this;
    this.generateSpeed = function(){
        for(var i = 0; i < scope.runners.length; i++) {
            var randomnumber = Math.floor(Math.random() * 2);
            scope.runners[i].setSpeed(Constants.SPEEDS[randomnumber]);
        }
    }
    this.runners[2].setState(AnimState.PICKED);
    this.generateSpeed();
    this.gameStart = true;
};

GameStage.prototype.onResult = function(runner){
    console.log("The winning runner is snail "+ runner.id);
    /**
     * TODO dispacth an complete event
     *
     */
    runner.setState(AnimState.IDLE);
    this.resetRunners();
};

GameStage.prototype.resize = function(data){
    var size = getWindowBounds();
    this.scale.x = data.scale.x;
    this.scale.y = data.scale.x;
    this.position.x = size.x/2;
    this.position.y = size.y/2;
};