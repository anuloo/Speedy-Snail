/**
 * Created by jollzy on 30/11/2015.
 * Keep all the positions other constant values and event types in one place.
 */
var Constants={
    //----------------------------GameStage
    AMOUNT_RUNNERS:3,
    GAME_WIDTH : 1136,
    GAME_HEIGHT : 1136,
    RUNNERS_START_POS:{x:[-455, -505, -550], y:[-310, -290, -100]},
    RUNNER_FINISH_LINE_POS:{x:420},
    SPEEDS : [0.5, 0.7, 0.8],
    //----------------------------BetBar
    INITIAL_BALANCE : 1000,
    BETBAR_POSITION_Y : 170,
    AMOUNT_BETBAR_LABELS:3,
    BETBAR_LABELS_POS :{x:[410, 150, -115], y:65},
    LABEL_BALANCE: "balance",
    LABEL_WINNING: "winning",
    LABEL_BET: "bet",
    IMAGE_LABEL_POS : {x:0, y:20},
    START_BUTTON_POS : {x:440, y:17},
    PLUS_BUTTON_POS : {x: 250, y:17},
    MINUS_BUTTON_POS : {x: 250, y:70},
    BET_VALUES : [10, 50, 100, 500, 1000, 5000],
    MIN_BUTTON_ID :0,
    PLUS_BUTTON_ID :1,
    //----------------------------PickPanel
    BUTTON_RUNNER1_X:-200,
    BUTTON_RUNNER2_X:0,
    BUTTON_RUNNER3_X:210,
    BUTTON_RUNNER1_Y:-60,
    BUTTON_RUNNER2_Y:-100,
    BUTTON_OK_X:300,
    BUTTON_OK_Y:100,
    BUTTON_RUNNER1_ID:0,
    BUTTON_RUNNER2_ID:1,
    BUTTON_RUNNER3_ID:2,
    LABEL_PICKED_RUNNER_X:-262,
    LABEL_PICKED_RUNNER_Y:-154
};
var GameEventType={
    ASSETS_LOADED : "GameEventType.ASSETS_LOADED",
    RACE_START: "GameEventType.RACE_START",
    RACE_COMPLETED: "GameEventType.RACE_COMPLETE",
    BET_COMPLETED: "GameEventType.BET_COMPLETED"
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
