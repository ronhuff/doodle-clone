var events = {
  arrayOfEvents: [],
  numOfEvents: 0
};

var eventInfo = {
  creator: "",
  nameOfEvent: "",
  dateOfEvent: "",
  timeSlots: [],
  numOfTimeSlots: 0,
  peopleAttending: [],
  numOfPeopleAttending: 0
};

var personInfo = {
  personsName: "",
  personsAvailability: []
};

var data;
var maker = "";
var nEvent = "";
var eDate = "";

function getData(){
  data = document.forms["eventMaker"];
  maker = data["admin"].value;
  nEvent = data["event_name"].value;
  eDate = data["date"].value;
}

function addEvent(arrayOfSlots){
  var eventInfo = {
    creator: maker,
    nameOfEvent: nEvent,
    dateOfEvent: eDate,
    timeSlots: arrayOfSlots,
    numOfTimeSlots: arrayOfSlots.length,
    peopleAttending: [],
    numOfPeopleAttending: 0
  };
  var personInfo = {
    personsName: eventInfo.creator,
    personsAvailability: []
  };
  if(checkDate() === false){
    alert("Please re-enter the date of the event.")
    return(false);
  }
  else if(dupMeet() === false){
    alert("Please re-enter the event's name.")
    return(false);
  }
  else {
    eventInfo.peopleAttending.push(personInfo);
    eventInfo.numOfPeopleAttending++;
    events.arrayOfEvents.push(eventInfo);
    events.numOfEvents++;
    return(true);
  }
}

function checkDate()
{
    console.log("Entered CheckDate()");
    console.log(eDate);
    console.log(eDate.slice(5,7) + "/" + eDate.slice(8,10));

    if(eDate.slice(5,7) == "01" && eDate.slice(8,10) == "01"){
        //New Year's Day.
        alert("No meetings permitted to be scheduled on New Year's Day.");
        return (false);
    }
    else if(eDate.slice(5,7) == "07" && eDate.slice(8,10) == "04"){
        //Independence Day
        alert("No meetings permitted to be scheduled on Independence Day.");
        return (false);
    }
    else if(eDate.slice(5,7) == "12" && eDate.slice(8,10) == "25"){
        //Christmas Day
        alert("No meetings permitted to be scheduled on Christmas Day.");
        return (false);
    }
    else {
      return(true);
    }
}

function dupMeet(){
  //checks if any duplicate events have been created.
  //This is done by checking if there is an event with the same name already created.
    for(var i = 0; i < events.numOfEvents; i++){
        if(events.arrayOfEvents[i].nameOfEvent === nEvent){
            alert("This event has already been created!");
            return(false);
        }
        else{
            return(true);
        }
    }
}

function dupPeople(){
  //checks if any checks if there is any duplicate people in the event that they are trying to check into.
}

function enteringEvent(popTimeSlots){
  getData();
  if(addEvent(popTimeSlots) === true){
    alert('The Event "'+nEvent+'" was created!')
  }
}

/*function tableCreate() {
    var body = document.getElementsByTagName('body')[0];
    var tbl = document.createElement('table');
    tbl.style.width = '100%';
    tbl.setAttribute('border', '1');
    var tbdy = document.createElement('tbody');
    for (var i = 0; i <= 1; i++) {
        var tr = document.createElement('tr');
        for (var j = 0; j < 3; j++) {
            if (i === 0 && j === 0)
            {
                var td = document.createElement('td');
                td.appendChild(document.createTextNode("Event Name"))
                tr.appendChild(td)
            }
            else if (i === 0 && j === 1)
            {
                var td = document.createElement('td');
                td.appendChild(document.createTextNode("Start Time"))
                tr.appendChild(td)
            }
            else if (i === 0 && j === 2)
            {
              var td = document.createElement('td');
              td.appendChild(document.createTextNode("End Time"))
              tr.appendChild(td)
            }
            else if  (i === 1 && j === 0)
            {
              var td = document.createElement('td');
              td.appendChild(document.createTextNode(nEvent))
              tr.appendChild(td)
            }
            else if (i === 1 && j === 1)
            {
              var td = document.createElement('td');
              td.appendChild(document.createTextNode(sTime))
              tr.appendChild(td)
            }
            else
            {
              var td = document.createElement('td');
              td.appendChild(document.createTextNode(eTime))
              tr.appendChild(td)
            }
        }
        tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
    body.appendChild(tbl)
}*/

function storeData(){
  localStorage.setItem("objectString", JSON.stringify(events));
}
function gettingData(){
  if(localStorage.getItem("objectString") !== null){
      var stringObj = localStorage.getItem("objectString");
      var lastObj = JSON.parse(stringObj)
      events = lastObj;
      console.log(lastObj);
  }
  else {
  }
}
