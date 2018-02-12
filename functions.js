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
  eventItems = document.querySelectorAll("h4"); //Load h4s into eventItems Array.
  for(var i = 0; i < eventItems.length; i++) { //For each event item <h4>...
    eventItems[i].addEventListener("click", function() { //Add event on click that...
      for(let j = 0; j < eventItems.length; j++) {
    	   eventItems[j].classList.remove("highlighted"); //First remove's all other <h4>'s highlighted class
      }
      this.classList.add("highlighted"); //Add Highlighted to the clicked event <h4>

      buttons.forEach(function(element) { //For each time slot button
        element.classList.remove("chosen"); //remove chosen class that indicates creator made is available at this time
      });
      
      var currentEInfo = this.innerHTML;
      var h4event = currentEInfo.substr(0, currentEInfo.indexOf('-')).slice(0, -1);
      var thisTimeSlots = events.arrayOfEvents[searchingForEvents(h4event)].timeSlots;
      for(let j = 0; j < thisTimeSlots.length; j++) {
        buttons.forEach(function(element) {
          if(element.innerHTML === thisTimeSlots[j]) element.classList.add("chosen");
        })
      }
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

function appendEvent(isValid, eventName, eventDate) {
  if(isValid) eventList.innerHTML += "<h4>" + eventName + " - " + eventDate + "</h4>";
  addListEvents();
}

function populateEventList() {
  if (events.numOfEvents > 0) {
    for(var i = 0; i < events.numOfEvents; i++) {
      eventList.innerHTML += "<h4>" + events.arrayOfEvents[i].nameOfEvent + " - " + events.arrayOfEvents[i].dateOfEvent + "</h4>"
    }
  }
}
