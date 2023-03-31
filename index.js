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
}


function display_events() {
    var html="";
    for (var i = 0; i < events.length; i++){
        var time = Number(events[i].time);
        var id = events[i].time;
        html += '<div class="row" id=\"'+id+'\"">';
        html += '<div class="hour">'+to12Hrs(time)+'</div>';
        html += '<textarea class='+eventClass(time)+'>'+events[i].event+'</textarea>';
        html += '<div class="saveBtn" onclick="saveEvent(\''+id+'\')">';
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
    var currentHr = Number(moment().format("H"));
    if(t < currentHr){
        className = "past";
    }else if(t == currentHr){
        className = "present";
    }else if(t > currentHr){
        className = "future";
    }
    return className;
}

// Add save event
function saveEvent(row_id) {
    var event_content = $("#" + row_id).find("textarea").val();
    var event_obj = events.find((event) => event.time === row_id);
    event_obj.event = event_content;
    localStorage.setItem("events", JSON.stringify(events)); // update the local storage
    toast();//Notify the user that the event has been saved
    setTimeout(removeToast, 1600);
}


// Create toast message for the event saved
function toast() {
    var toast = "";
    toast += '<div class="app_toast">';
    toast +='<i class="fa-sharp fa-regular fa-circle-check fa-xl"></i> Event Saved!';
    toast += '</div>';
    $("body").append(toast);
    $(".app_toast").fadeIn();
}

// Remove the toast
function removeToast() {
    $(".app_toast").fadeOut("slow", function(){
        this.remove();
    });
}