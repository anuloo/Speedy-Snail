/**
 * Created by jollzy on 01/12/2015.
 * pop up panel to sho winner
 */
function WinPanel(texture,itemCreator){

    //label style
    var style = {
        font : 'bold 100px Arial',
        fill : '#FFFFFF'
    };

    Panel.call(this,texture);
    this.anchor.x = this.anchor.y = 0.5;

    // Initial positioning
    var size = getWindowBounds();
    //Need to hide around 400 px down so the tween can move it from
    this.position.y = this.position.y + 400;

    //label for the picked runner
    this.winLabel = itemCreator.createLabel(0,style);
    itemCreator.setLabelProperties(0.5,Constants.LABEL_WON_POS.x,Constants.LABEL_WON_POS.y);

    this.addChild(this.winLabel);
};

WinPanel.prototype = Object.create(Panel.prototype);
WinPanel.prototype.constructor = WinPanel;

WinPanel.prototype.onTweenComplete = function(isShow){
    var scope = this;
    if(isShow==true){
        this.delayClosePanel = setTimeout(function(){scope.show(false)},2000);
    }else{
        Events.Dispatcher.dispatchEvent(new Event(GameEventType.WIN_PRESENTATION_COMPLETED));
    }
};

WinPanel.prototype.updateWinLabel = function(amount){
    this.winLabel.text = amount.toString();
};


