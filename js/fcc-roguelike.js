"use strict";

var Driver = React.createClass({
    displayName: "Driver",

    getInitialState: function getInitialState() {
        return { directions: true };
    },
    render: function render() {
        return React.createElement(
            "div",
            null,
            this.state.directions ? React.createElement(Directions, { onClick: function () {
                    this.setState({ directions: false });
                }.bind(this) }) : "",
            "test"
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
                "FCC Roguelike"
            ),
            React.createElement(
                "ul",
                null,
                React.createElement(
                    "li",
                    null,
                    "Selecting a tile to attempt to interact with it"
                ),
                React.createElement(
                    "li",
                    null,
                    "Select an empty tile to move onto it"
                ),
                React.createElement(
                    "li",
                    null,
                    "Select a tile with an enemy to attack them"
                ),
                React.createElement(
                    "li",
                    null,
                    "Defeat the dungeon boss to win"
                )
            ),
            React.createElement(
                "span",
                null,
                "click anywere to start"
            )
        )
    );
};

window.onload = function () {
    ReactDOM.render(React.createElement(Driver, null), document.getElementById("container"));
};
//# sourceMappingURL=fcc-roguelike.js.map
