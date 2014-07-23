var _ = require('underscore');<% if (includeJQuery) { %>
var $ = require('jquery');<% } %><% if (includeBacon) { %>
var Bacon = require('baconjs');
$.fn.asEventStream = Bacon.$.asEventStream;<% } %><% if (includeD3) { %>
var d3 = require('d3');<% } %><% if(includeReact) { %>
var React = require('react');
var ReactExample = require('./react-example.jsx');<% } %>

// App javascript goes here
console.log("loaded main.js, all is well!");

<% if (includeJQuery) { %>
$(function() {
    $('body').append('<div>Congrats, JQuery is working!</div>');
});
<% } %><% if (includeBacon) { %>
$(function() {
    $('body').append('<div>Bacon is working! <span id="up">up</span> <span id="down">down</span> <span id="counter">0</span></div>');

    var up = $('#up').asEventStream('click');
    var down = $('#down').asEventStream('click');
    var counter = up.map(1).merge(down.map(-1))
                    .scan(0, function(x, y) { return x + y; });
    counter.assign($('#counter'), 'text');
});
<% } %><% if (includeReact) { %>
$('body').append('<div id="react-example"></div>');
React.renderComponent(new ReactExample(), document.getElementById('react-example'));
<% } %>
