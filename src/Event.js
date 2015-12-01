/**
 * Created by jollzy on 30/11/2015.
 * Simple Event used when we dispatching a new custom event
 */

function Event (type, data){
    this.type = type;
    this.data = data;
}

Event.prototype.type = null;
Event.prototype.data = null;
