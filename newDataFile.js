var events = {
  arrayOfEvents: [],
  numOfEvents: 0
};

var eventInfo = {
  creator: "",
  nameOfEvent: "",
  dateOfEvent: "",
  startingTime: "HH:MM",
  endTime: "HH:MM",
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
var sTime = "";
var eTime = "";
var nSlots = 0;

function getData(){
  data = document.forms["eventMaker"];
  maker = data["admin"].value;
  nEvent = data["event"].value;
  eDate = data["date"].value;
  sTime = data["stime"].value;
  eTime = data["etime"].value;
}

function addMeeting(){
  var eventInfo = {
    creator: maker,
    nameOfEvent: nEvent,
    dateOfEvent: eDate,
    startingTime: sTime,
    endTime: eTime,
    numOfTimeSlots: nSlots,
    peopleAttending: [],
    numOfPeopleAttending: 0
  };
  var personInfo = {
    personsName: eventInfo.creator,
    personsAvailability: []
  };
  if(checkTime(eventInfo) === false){
    alert("Please re-enter the event's start and end times.")
    return(false);
  }
  else if(checkDate() === false){
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

function checkTime(object) // where time is HH:MM && time1 is begin, time2 is end
{
    console.log("Entered checkTime()");
    console.log(object.startingTime + " " + object.endTime);

    var startHr = Number(object.startingTime.slice(0, 2));
    var startMin = Number(object.startingTime.slice(3, 5));
    var endHr = Number(object.endTime.slice(0, 2));
    var endMin = Number(object.endTime.slice(3, 5));
    if (startHr > endHr){
        // checks if the event starts and end on the same day
        alert("The event must start and end on the same day.");
        return(false);
    }
    else if((startMin%20 !== 0)||(endMin%20 !== 0)){
        alert("Meeting must begin and end on the hour or 20 minute increments thereof.");
        return(false);
    }
    else if(((startHr >= 00)&&(startHr < 05)) || ((endHr > 00)&&(endHr <= 05))){
        //Check for overnight
        alert("Meetings may not occur between 12:00am - 5:00am");
        return(false);
    }
    else if(((startHr >= 12)&&(startHr < 13)) || ((endHr >= 12)&&(endMin > 00)&&(endHr <= 13))){
        //Check for lunch.
        alert("Meetings may not occur between 12:00pm - 1:00pm");
        return(false);
    }
    else if(((startHr >= 05)&&(startHr < 13)) && (endHr > 12)){
        //Check if meeting would span the restricted overnight period.
        alert("Meetings may not extend through lunch.");
        return(false)
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
  for(var i = 0; i < )
}

function eventSubmit(){
  getData();
  if(addMeeting() === true){
    tableCreate();
  }
}

function tableCreate() {
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
}

function storeData(){
  localStorage.setItem("objectString", JSON.stringify(events));
}
function gettingData(){
  if(localStorage.getItem("objectString") !== null){
      var stringObj = localStorage.getItem("objectString");
      var lastObj = JSON.parse(stringObj)
      events = lastObj;
      console.log(lastObj);
      //
  }
  else {
  }
}
