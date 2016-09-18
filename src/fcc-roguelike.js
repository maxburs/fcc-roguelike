var Driver = React.createClass({
    getInitialState: function(){
        return {directions: true};
    },
    render: function(){
        return <div>
            {this.state.directions
                ? <Directions onClick={
                    function(){this.setState({directions:false});}.bind(this)
                }/>
                : ""}
            test
        </div>;
    }
});

const Directions = props => (
    <div id="directions" onClick={props.onClick}>
        <div>
            <h1>FCC Roguelike</h1>
            <ul>
                <li>Selecting a tile to attempt to interact with it</li>
                <li>Select an empty tile to move onto it</li>
                <li>Select a tile with an enemy to attack them</li>
                <li>Defeat the dungeon boss to win</li>
            </ul>
            <span>click anywere to start</span>
        </div>
    </div>
);

window.onload = function() {
    ReactDOM.render(React.createElement(
        Driver, null),
        document.getElementById("container") );
};