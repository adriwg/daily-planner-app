var currentDay = $("#currentDay");
var events = [];

$(document).ready(function () {
    
    getDate();

});


// Get the current date in the format Friday, March 31st
function getDate() {
    var today = moment().format("dddd, MMMM Do");
    currentDay.text(today);

}