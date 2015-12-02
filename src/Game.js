/**
 * Created by jollzy on 01/12/2015.
 */
var pickedRunner = 2;
function Game(){
    //TODO adding a mask
    PIXI.Container.call(this);
    this.bg = null;
    this.itemCreator = null;
    this.gameStage = null;
    this.betBar = null;
    this.pickPanel = null;
    this.animate = this.animate.bind(this);

    var shape = new PIXI.Graphics();
    shape.beginFill(0xffffff,1);
    shape.drawRect(0,0,Constants.GAME_WIDTH,Constants.GAME_HEIGHT);
    shape.endFill();
    this.gameMask = new PIXI.Sprite(shape.generateTexture());

    //this.gameMask = new PIXI.Sprite(PIXI.loader.resources["pick_panel_mask"].texture);
    this.gameMask.anchor.x = this.gameMask.anchor.y = 0.5;

};

Game.prototype = Object.create(PIXI.Container.prototype);
Game.prototype.constructor = Game;

//once all assets loaded we adding them to stage
Game.prototype.onAssetsLoaded = function(){
    //I find it more convenient to create it once and pass as a param
    this.itemCreator = new ItemCreator();
    this.bg = new Background();
    this.gameStage = new GameStage(this.itemCreator);
    this.pickPanel = new PickPanel(this.itemCreator);
    this.betBar = new BetBar(this.itemCreator, this.pickPanel);
    this.addChild(this.bg);
    this.addChild(this.gameStage);
    this.addChild(this.pickPanel);
    this.addChild(this.gameMask);
    this.addChild(this.betBar);
    stage.addChild(this);
    requestAnimationFrame(this.animate);
    this.pickPanel.mask = this.gameMask;
    this.gameStage.mask = this.gameMask;
};

//as the animation loops are can used in the other component
//I moved it out from the GameStage
Game.prototype.animate = function() {
    this.gameStage.gameLoop();

    requestAnimationFrame(this.animate);
    TWEEN.update();
    renderer.render(stage);
};

//I also removed from every component the resize function and
//Implemented just one place the Game
Game.prototype.resize = function(data){
    var size = getWindowBounds();
    this.scale.x = data.scale.x;
    this.scale.y = data.scale.x;
    this.position.x = size.x/2;
    this.position.y = size.y/2;
};

