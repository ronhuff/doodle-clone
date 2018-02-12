var buttons = document.querySelectorAll(".time");
var eventList = document.querySelector(".Event_list")
var timeSlots = [];
var selectedList = [];
var twelveHourMode = false;

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
}

function addButtonEvents() {
  for(var i = 0; i < buttons.length; i++){
    buttons[i].addEventListener("click", function(){
    	this.classList.toggle("selected");
    })
  }
}

function populateTimeSlots() {
  buttons.forEach(function(element) {
    timeSlots.push(element.id)
  })
}

function eventSubmit() {
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
        buttons[i].innerHTML = String(Number(buttons[i].id.substring(0,2)) - 12) + buttons[i].id.substring(2,6) + " PM";
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

function appendEvent(eventName) {
  eventList.innerHTML += "<h4>" + eventName + "</h4>"
}

function populateEventList() {
  if (events.numOfEvents > 0) {
    for(var i = 0; i < events.numOfEvents; i++) {
      eventList.innerHTML += "<h4>" + events.arrayOfEvents[i].nameOfEvent + "</h4>"
    }
  }
}
