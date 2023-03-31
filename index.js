var currentDay = $("#currentDay");
var currentHr = Number(moment().format("H"));
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
}

function display_events() {
    var html="";
    for (var i = 0; i < events.length; i++){
        var time = Number(events[i].time);
        html += '<div class="row" data-hr="'+events[i].time+'" id='+events[i].time+'">';
        html += '<div class="hour">'+to12Hrs(time)+'</div>';
        html += '<textarea class='+eventClass(time)+'>'+events[i].event+'</textarea>';
        html += '<div class="saveBtn">';
        html += '<i class="fa-solid fa-floppy-disk fa-lg"></i>';
        html += '</div>';
        html += '</div>';
    }
    $(".time-block").append(html);
}

// Time format change from 24-hr to 12-hr
function to12Hrs(t) {
    var timeslot = "";
    if(t<12){
        timeslot = t+"AM";
    }else{
        if(t=="12"){
            timeslot = t+"PM";
        }else{
            timeslot = t -12;
            timeslot = timeslot.toString()+"PM";
        }   
    }
    return timeslot;
}

// Get class name for the event textarea
function eventClass(t){
    var className="";
    if(t < currentHr){
        className = "past";
    }else if(t == currentHr){
        className = "present";
    }else if(t > currentHr){
        className = "future";
    }
    return className;
}