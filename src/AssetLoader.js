/**
 * Created by jollzy on 30/11/2015.
 * Extending pixi loader gives me flexibility to load any assets
 */

function AssetLoader(){
    this.loadX = function(loaderConfig) {
        var loader = PIXI.loader;
        for(var obj in loaderConfig){
            console.log(obj);
            for(var key in loaderConfig[obj]){
                console.log(key);
                loader.add(key,loaderConfig[obj][key]);
            }
        }
        loader.once('complete', onComplete);
        loader.load();
    };

    function onComplete(){
        Events.Dispatcher.dispatchEvent(new Event(GameEventType.ASSETS_LOADED));
    }
}

