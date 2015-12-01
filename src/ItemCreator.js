/**
 * Created by jollzy on 01/12/2015.
 */
function ItemCreator() {
    var item, label

    // Generally create any item on the stage which has the same properties
    this.create = function (Class,textures,self,callback,id) {
        item = new Class(textures,self,callback,id);
        return item;
    }
    this.setProperties = function(anchorX,x,y){
        item.anchor.x = anchorX;
        item.y = item.y + y;
        item.x = item.x + x;
    }
    //as i thought would it be need another create method for the label
    this.createLabel = function (text,style) {
        label = new PIXI.Text(text.toString(),style);
        return label;
    }

    this.setLabelProperties = function(anchorX,x,y){
        label.anchor.x = anchorX;
        label.y = y;
        label.x = label.x - x;
    }
}


