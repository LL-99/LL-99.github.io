$(document).ready(function () { 
    //window.alert($("header").append('<div id=\"navbar-holder\"></div>'));
    //window.alert($("#navbar-holder").prop('outerHTML'));
    // Add navbar holder element
    $("header").append('<div id=\"navbar-holder\"></div>');

    // Create depth offset
    var depth = (location.pathname.split('/')).length - 1;    
    var offset = (depth > 1 ? '..\\'.repeat(depth-1) : '');

    // Load navbar from file
    $("#navbar-holder").load("/loaders/nav.html");
});