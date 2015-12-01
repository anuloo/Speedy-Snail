/**
 * Created by jollzy on 30/11/2015.
 * Keep all the positions other constant values and event types in one place.
 */
var Constants={
    AMOUNT_RUNNERS:3,
    GAME_WIDTH : 1136,
    GAME_HEIGHT : 1136,
    RUNNERS_START_X:[-550,-505,-455],
    RUNNERS_START_Y:[-100,-290,-310],
    RUNNER_FINISH_LINE_X:420,
    SPEEDS : [0.5, 0.7, 0.8]
};
var GameEventType={
    ASSETS_LOADED : "GameEventType.ASSETS_LOADED",
    RACE_START: "GameEventType.RACE_START"
};

var AnimState = {
    IDLE: 0,
    PICKED: 1
};
