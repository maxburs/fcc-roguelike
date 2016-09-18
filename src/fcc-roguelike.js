const Test = props => (
    <div>test</div>
);

window.onload = function() {
    ReactDOM.render(React.createElement(
        Test, null),
        document.getElementById("container") );
};