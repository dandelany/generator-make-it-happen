/** @jsx React.DOM */
var React = require('react');

var ReactExample = React.createClass({
    render: function() {
        return (
            <div>
                <h3>Sample React Component</h3>
                <p>This is a React component written in JSX!</p>
            </div>
        );
    }
});

if( typeof module !== "undefined" && ('exports' in module)) {
    module.exports	= ReactExample;
}