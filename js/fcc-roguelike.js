"use strict";

var cellStates = ["hidden", //0
"empty", //1
"player", //2
"wall", //3
"enemy" //4
];
//game may break if set to an even number, mask needs to be manualy updated upon a change
var viewSide = 15;
//the world does not use the "hidden" value
var world = {
    width: 49,
    height: 99,
    //array of columb arrays for x/y indexing
    walls: [],
    enemies: [],
    player: { x: 0, y: 0 },
    composite: [],
    view: [],
    getLocationValue: function getLocationValue(x, y) {
        if (x < 0 || x > this.width || y < 0 || y > this.height) {
            return 3;
        }
        return this.composite[x][y];
    },
    generateNew: function generateNew() {
        //TESTING CODE
        this.walls = [];
        for (var w = 0; w < this.width + 1; w++) {
            this.walls.push([]);
            for (var h = 0; h < this.height + 1; h++) {
                this.walls[w].push(1);
            }
        }
        this.buildComposite();
        window.buildView();
    },
    buildComposite: function buildComposite() {
        //this clones map (breaks references to map in composite);
        this.composite = this.walls.map(function (i) {
            return i.map(function (p) {
                return p;
            });
        });
        this.composite[this.player.x][this.player.y] = 2;
    }
};
function playerClick(move) {
    if (window.world.view[move] === 0 || window.world.view[move] === 2 || window.world.view[move] === 3) {
        console.log("invalid move");
        return;
    }

    var xOffset = move % viewSide - (viewSide - 1) / 2;
    var yOffset = (Math.floor(move / viewSide) - (viewSide - 1) / 2) * -1;

    //TESTING CODE
    world.player.x += xOffset;
    world.player.y += yOffset;

    //moveQueue will be genorated here
    window.world.buildComposite();
    window.buildView();
    window.updateViewState(window.world.view);
};
function stepGame() {
    //execute a move in the queue
    //if no more moves are left delete interval
    buidView();
};
var moveQueue = [];
//width and height and NOT zero indexed

function buildView() {
    var viewMask = [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0];

    var newView = [];
    for (var y = (window.viewSide - 1) / 2; y >= (window.viewSide - 1) / 2 * -1; y--) {
        for (var x = (window.viewSide - 1) / 2 * -1; x <= (window.viewSide - 1) / 2; x++) {
            newView.push(world.getLocationValue(x + world.player.x, y + world.player.y));
        }
    }
    window.world.view = newView.map(function (value, index) {
        return value * viewMask[index];
    });
    return window.world.view;
};

var Driver = React.createClass({
    displayName: "Driver",

    getInitialState: function getInitialState() {
        return {
            directions: true,
            measureNode: undefined,
            size: ["100px", "100px"],
            viewState: window.world.view };
    },
    __getNode: function __getNode(node) {
        this.setState({ measureNode: node }, this.__setSize);
    },
    componentWillMount: function componentWillMount() {
        var _this = this;

        window.updateViewState = function (newState) {
            _this.setState({ viewState: newState });
        };
    },
    componentDidMount: function componentDidMount() {
        window.addEventListener("resize", this.__resizeWithTimeout);
        window.buildView();
    },
    componentWillUnmount: function componentWillUnmount() {
        window.removeEventListener("resize", this.__resizeWithTimeout);
    },
    __setSize: function __setSize() {
        var newSize;
        if (this.state.measureNode.offsetWidth > this.state.measureNode.offsetHeight) {
            newSize = [this.state.measureNode.offsetHeight + "px", this.state.measureNode.offsetHeight + "px"];
        } else {
            newSize = [this.state.measureNode.offsetWidth + "px", this.state.measureNode.offsetWidth + "px"];
        }
        this.setState({ size: newSize });
    },
    //is this the right way to do this? i don't want the component to re-render a bazillion times when i resize the window...
    __resizeTimeout: undefined,
    __resizeWithTimeout: function __resizeWithTimeout() {
        window.clearTimeout(this.__resizeTimeout);
        this.__resizeTimeout = window.setTimeout(this.__setSize, 200);
    },
    __cellClick: function __cellClick(index) {
        window.playerClick(index);
    },
    render: function render() {
        var _this2 = this;

        return React.createElement(
            "div",
            { ref: this.__getNode },
            this.state.directions ? React.createElement(Directions, { onClick: function () {
                    this.setState({ directions: false });
                }.bind(this) }) : "",
            React.createElement(
                "div",
                {
                    id: "game-display",
                    style: { width: this.state.size[0], height: this.state.size[1] } },
                this.state.viewState.map(function (value, index) {
                    return React.createElement(Cell, {
                        contains: value,
                        key: index,
                        onClick: _this2.__cellClick.bind(_this2, index) });
                })
            )
        );
    }
});

var Directions = function Directions(props) {
    return React.createElement(
        "div",
        { id: "directions", onClick: props.onClick },
        React.createElement(
            "div",
            null,
            React.createElement(
                "h1",
                null,
                "React Roguelike"
            ),
            React.createElement(
                "ul",
                null,
                React.createElement(
                    "li",
                    null,
                    "Select an empty tile to move"
                ),
                React.createElement(
                    "li",
                    null,
                    "Select an enemy to attack"
                ),
                React.createElement(
                    "li",
                    null,
                    "Defeat the dungeon boss to win"
                )
            ),
            React.createElement(
                "div",
                null,
                "click to start"
            )
        )
    );
};

var Cell = function Cell(props) {
    return React.createElement("div", {
        className: "cell " + cellStates[props.contains],
        onClick: props.onClick
    });
};

window.onload = function () {
    world.generateNew();
    ReactDOM.render(React.createElement(Driver, null), document.getElementById("container"));
};
//# sourceMappingURL=fcc-roguelike.js.map
