var buttons = document.querySelectorAll(".time"); //array of time time slots
var eventList = document.querySelector(".Event_list"); //DOM object for the event list
var eventItems = document.querySelectorAll("h4"); //event list's items
var timeSlots = [];
var selectedList = [];
var twelveHourMode = false; //boolean for what time mode user wants
var personName = ""; //global variables to be passed out
var highlightedEvent = "";//this too.

function dropdownMenu() {
    document.getElementById("dropdown").classList.toggle("show"); //Shows or does not show the menu onclick
}

window.onclick = function(event) {
  if(!event.target.matches('.dropmenu')) {
    var dropwdowns = document.getElementsByClassName("dd-items"); //the two other .html files
    for (var i = 0; i<dropwdowns.length; i++) {
      var openDD = dropwdowns[i]; //we misspelled dropdowns but now we're rolling with it
      if (openDD.classList.contains('show')) {
        openDD.classList.remove('show');
      }
    }
  }
}

function init() { //function called on page load. sets up page:
  addButtonEvents(); //Code that runs when time slots are clicked
  populateTimeSlots(); //set initial button inner html values from each button's ID
  populateButtonHTML(); //addjusts the buttons' html to the time mode
  populateEventList(); //adds events in local storage to list of events
  addListEvents(); //adds a bunch of onclick-events to the list items. (see immediately below)
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
      var thisTimeSlots = events.arrayOfEvents[searchingForEvents(h4event)].timeSlots; //get the time slots the creator marked availability
      for(let j = 0; j < thisTimeSlots.length; j++) {
        buttons.forEach(function(element) {
          if(element.innerHTML === thisTimeSlots[j]) element.classList.add("chosen"); //outline which times the creator chose
        })
      }
    });
  }
}

function submitAvail() { //sets global eveals
  personName = document.forms["Availability"]["attendee"].value; //gets the name of the attendee.

  var shortening = document.querySelector(".highlighted").innerHTML;//just shortens, or else this would be a massive line of code
  highlightedEvent = shortening.substr(0, shortening.indexOf('-')).slice(0, -1); //sets the event name that is marked for availability
}

function addButtonEvents() { //add selecting event to time slot buttons
  for(var i = 0; i < buttons.length; i++){
    buttons[i].addEventListener("click", function(){
    	this.classList.toggle("selected"); //toggles green background color.
    });
  }
}

function populateTimeSlots() {
  buttons.forEach(function(element) {//for each time slot button...
    timeSlots.push(element.id); //adds the time slot button ID (formatted "HH:MM") to timeSlots
  })
}

function eventSubmit() { //send
  selectedList = []; //resets selected list array
  for(var i = 0; i < buttons.length; i++) { //for all time slot buttons...
    if(buttons[i].classList.contains("selected")) { //if the time slot is marked...
      selectedList.push(timeSlots[i]); //add it to the availability array
    }
  }
}

function populateButtonHTML() {
  for(var i = 0; i < buttons.length; i++) {
    if(twelveHourMode) { //case for 12 hour mode
      if(Number(buttons[i].id.substring(0,2)) - 12 >= 0) { //if the time is after noon...
        buttons[i].innerHTML = String(Number(buttons[i].id.substring(0,2)) - 12) + buttons[i].id.substring(2,6) + " PM"; //adjusts times to 12-hour mode.
      }
      else {
        buttons[i].innerHTML += " AM";
      }
    } //case for 24 hour mode
    else {
      buttons[i].innerHTML = buttons[i].id;
    }
  }
}

function toggleMode() { //when the change time mode button is pressed
  twelveHourMode = !twelveHourMode; //change global time mode boolean
  populateButtonHTML(); //change the time slot buttons' html
}

function appendEvent(isValid, eventName, eventDate) { //adds new event item to event list
  if(isValid) eventList.innerHTML += "<h4>" + eventName + " - " + eventDate + "</h4>";
  addListEvents(); //adds new event to this event list item
}

function populateEventList() { //gets local storage events and populates event list
  if (events.numOfEvents > 0) {
    for(var i = 0; i < events.numOfEvents; i++) { //for each event in local storage ...
      eventList.innerHTML += "<h4>" + events.arrayOfEvents[i].nameOfEvent + " - " + events.arrayOfEvents[i].dateOfEvent + "</h4>" //add an h4 with the event's name and date
    }
  }
}
