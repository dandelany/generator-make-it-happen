<% if (includeJQuery) { %>var $ = require('jquery');
<% } %>

// App javascript goes here

console.log("loaded main.js, all is well!");

<% if (includeJQuery) { %>
$(function() {
    $('body').append('<div>Congrats, JQuery is working!</div>');
});

<% } %>
