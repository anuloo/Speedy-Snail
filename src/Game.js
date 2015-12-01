/**
 * Created by jollzy on 01/12/2015.
 */
function Game(){
    this.bg = null;
    this.itemCreator = null;
    this.gameStage = null;
}
//once all assets loaded we adding them to stage
Game.prototype.onAssetsLoaded = function(){
    //I find it more convenient to create it once and pass as a param
    this.itemCreator = new ItemCreator();
    this.bg = new Background();
    this.gameStage = new GameStage(this.itemCreator);
};

