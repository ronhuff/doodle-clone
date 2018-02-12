var buttons = document.querySelectorAll(".time");
var eventList = document.querySelector(".Event_list");
var eventItems = document.querySelectorAll("h4");
var timeSlots = [];
var selectedList = [];
var twelveHourMode = false;
var personName = "";
var highlightedEvent = "";

function dropdownMenu() {
    document.getElementById("dropdown").classList.toggle("show");
}

window.onclick = function(event) {
  if(!event.target.matches('.dropmenu')) {
    var dropwdowns = document.getElementsByClassName("dd-items");
    for (var i = 0; i<dropwdowns.length; i++) {
      var openDD = dropwdowns[i];
      if (openDD.classList.contains('show')) {
        openDD.classList.remove('show');
      }
    }
  }
}

function init() {
  addButtonEvents();
  populateTimeSlots();
  populateButtonHTML();
  populateEventList();
  addListEvents();
}

function addListEvents() {
  eventItems = document.querySelectorAll("h4");
  for(var i = 0; i < eventItems.length; i++) {
    eventItems[i].addEventListener("click", function() {
      for(var i = 0; i < eventItems.length; i++) {
    	   eventItems[i].classList.remove("highlighted");
      }
      this.classList.add("highlighted");
    });
  }
}

function submitAvail() {
  personName = document.forms["Availability"]["attendee"].value;
  var shortening = document.querySelector(".highlighted").innerHTML
  highlightedEvent = shortening.substr(0, shortening.indexOf('-')).slice(0, -1); //holy shit
}

function addButtonEvents() {
  for(var i = 0; i < buttons.length; i++){
    buttons[i].addEventListener("click", function(){
    	this.classList.toggle("selected");
    });
  }
}

////////////////////////////////////////////////////////////////////////////////
//                             NOT THE REAL FUNCTION
////////////////////////////////////////////////////////////////////////////////
function sendAvail(a, b, c) {
  console.log(a);
  console.log(b);
  console.log(c);
}
////////////////////////////////////////////////////////////////////////////////
//                                    DELETE PLS
////////////////////////////////////////////////////////////////////////////////

function populateTimeSlots() {
  buttons.forEach(function(element) {
    timeSlots.push(element.id);
  })
}

function eventSubmit() {
  selectedList = [];
  for(var i = 0; i < buttons.length; i++) {
    if(buttons[i].classList.contains("selected")) {
      selectedList.push(timeSlots[i]);
    }
  }
}

function populateButtonHTML() {
  for(var i = 0; i < buttons.length; i++) {
    if(twelveHourMode) {
      if(Number(buttons[i].id.substring(0,2)) - 12 >= 0) {
        buttons[i].innerHTML = String(Number(buttons[i].id.substring(0,2)) - 12) + buttons[i].id.substring(2,6) + " PM"; //Well i guess i'll go fuck myself
      }
      else {
        buttons[i].innerHTML += " AM";
      }
    }
    else {
      buttons[i].innerHTML = buttons[i].id;
    }
  }
}

function toggleMode() {
  twelveHourMode = !twelveHourMode;
  populateButtonHTML();
}

function appendEvent(eventName, eventDate) {
  eventList.innerHTML += "<h4>" + eventName + " - " + eventDate + "</h4>";
}

function populateEventList() {
  if (events.numOfEvents > 0) {
    for(var i = 0; i < events.numOfEvents; i++) {
      eventList.innerHTML += "<h4>" + events.arrayOfEvents[i].nameOfEvent + " - " + events.arrayOfEvents[i].dateOfEvent + "</h4>"
    }
  }
}
