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
}


