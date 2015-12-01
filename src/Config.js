/**
 * Created by jollzy on 30/11/2015.
 * Keep all the positions other constant values and event types in one place.
 */
var Constants={
    AMOUNT_RUNNERS:3,
    GAME_WIDTH : 1136,
    GAME_HEIGHT : 1136,
    RUNNERS_START_X:[-455,-505,-550],
    RUNNERS_START_Y:[-310,-290,-100],
    RUNNER_FINISH_LINE_X:420,
    SPEEDS : [0.5, 0.7, 0.8],
    INITIAL_BALLANCE : 1000,
    BETBAR_POSITION_Y : 170,
    LABEL_POSITION_Y : 65,
    LABEL_BALLANCE_X : 410,
    LABEL_WINNINGS_X : 150,
    LABEL_BET_X : 115,
    START_BUTTON_X : 440,
    START_BUTTON_Y : 17,
    PLUS_BUTTON_Y : 17,
    MINUS_BUTTON_Y : 70,
    BET_BUTTON_X : 250,
    BET_VALUES : [10,50,100,500,1000,5000],
    MIN_BUTTON_ID :0,
    PLUSS_BUTTON_ID :1
};
var GameEventType={
    ASSETS_LOADED : "GameEventType.ASSETS_LOADED",
    RACE_START: "GameEventType.RACE_START",
    RACE_COMPLETED: "GameEventType.RACE_COMPLETE"
};

var AnimState = {
    IDLE: 0,
    PICKED: 1
};

var ButtonState = {
    ENABLED: 0,
    DISABLED: 1
};

var ButtonEventType = {
    START: "ButtonEvent.START",
    DISABLED: "ButtonEvent.DISABLED",
    INCREASE: "ButtonEvent.INCREASE",
    BET_CLICKED: "ButtonEvent.BET_CLICKED"
};
