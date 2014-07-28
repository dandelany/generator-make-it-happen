var _ = require('underscore');
var $ = require('jquery');<% if (includeBacon) { %>
var Bacon = require('baconjs');
$.fn.asEventStream = Bacon.$.asEventStream;<% } %><% if (includeD3) { %>
var d3 = require('d3');<% } %><% if(includeReact) { %>
var React = require('react');
var ReactExample = require('./react-example.jsx');<% } %>

// App javascript goes here
console.log("loaded main.js, all is well!");
<% if (includeBacon) { %>
// Bacon.js example
$(function() {
    var up = $('#bacon-up').asEventStream('click');
    var down = $('#bacon-down').asEventStream('click');
    var counter = up.map(1).merge(down.map(-1))
                    .scan(0, function(x, y) { return x + y; });
    var power = counter.scan(0, function(x, y) { return Math.pow(2,y); });
    power.assign($('#bacon-counter'), 'text');
});
<% } %><% if (includeReact) { %>
// Example React component located at src/scripts/react-example.jsx
React.renderComponent(new ReactExample(), document.getElementById('react-example'));
<% } %><% if (includeD3) { %>
// D3 example
var d3Data = [5, 28, 19, 8, 7, 42];
d3.select('#d3-example')
    .selectAll('div')
        .data(d3Data)
    .enter().append('div')
        .classed('bar', true)
        .style('width', function(d) { return (d * 10) + 'px'; })
        .text(function(d) { return d; });
<% } %>
