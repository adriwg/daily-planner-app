var currentDay = $("#currentDay");
var events = [];

$(document).ready(function () {
    
    getDate();

    // Get events from local storage
    if(localStorage.getItem("events") == null) {
        init_events();    
    }else{
        events = JSON.parse(localStorage.getItem("events"));
    }
    display_events();
});


// Get the current date in the format Friday, March 31st
function getDate() {
    var today = moment().format("dddd, MMMM Do");
    currentDay.text(today);
}


//Initial events
function init_events() {
    for (var i = 0; i < 9; i++) {
        events.push({
            time: (9+i).toString(),
            event: ""
        });
    }
    console.log(events);
}

function display_events() {
    var html="";
    for (var i = 0; i < events.length; i++){
        html += '<div class="row" data-hr="'+events[i].time+'" id='+events[i].time+'">';
        html += '<div class="hour">'+events[i].time+'AM</div>';
        html += '<textarea>'+events[i].event+'</textarea>';
        html += '<div class="saveBtn">';
        html += '<i class="fa-solid fa-floppy-disk fa-lg"></i>';
        html += '</div>';
        html += '</div>';
    }
    $(".time-block").append(html);
}