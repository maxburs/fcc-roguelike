"use strict";

var Test = function Test(props) {
    return React.createElement(
        "div",
        null,
        "test"
    );
};

window.onload = function () {
    ReactDOM.render(React.createElement(Test, null), document.getElementById("container"));
};
//# sourceMappingURL=fcc-roguelike.js.map
