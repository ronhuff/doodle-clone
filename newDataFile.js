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
  numOfTimeSlots: 0,
  peopleAttending: [],
  numOfPeopleAttending: 0
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
  //nSlots = event_duration(sTime,eTime);
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
  events.arrayOfEvents.push(eventInfo);
  events.numOfEvents++;
}

function checkDate()
{
    console.log("Entered CheckDate()");
    console.log(eDate);
    console.log(eDate.slice(5,7) + "/" + eDate.slice(8,10));

    //New Year's Day.
    if(eDate.slice(5,7) == "01" && eDate.slice(8,10) == "01")
    {
        alert("No meetings permitted to be scheduled on New Year's Day.");
        return (false);
    }
    //Independence Day
    if(eDate.slice(5,7) == "07" && eDate.slice(8,10) == "04")
    {
        alert("No meetings permitted to be scheduled on Independence Day.");
        return (false);
    }
    //Christmas Day
    if(eDate.slice(5,7) == "12" && eDate.slice(8,10) == "25")
    {
        alert("No meetings permitted to be scheduled on Christmas Day.");
        return (false);
    }
    console.log("Date does not violate holiday constraints *DBG");
    return (true);
}

function checkTime() // where time is HH:MM && time1 is begin, time2 is end
{
    //Check for timeslot compliance.

    console.log("Entered checkTime()");
    console.log(stime + " " + etime);

    var startHr = Number(stime.slice(0, 2));
    var startMin = Number(stime.slice(3, 5));
    var endHr = Number(etime.slice(0, 2));
    var endMin = Number(etime.slice(3, 5));
    if( (( startMin % 20 == 0 ) && ( endMin % 20 == 0 )) == false )
    {
        alert("Meeting must begin and end on the hour or 20 minute increments thereof.");
        console.log("startMin || endMin not on timeslot");
        return(false);
    }
    console.log(startHr, startMin, endHr, endMin + " data1.js:74 *DBG");

    //Check for overnight
    if( (startHr >= "00" && startHr < "05") || (endHr > "00" && endHr <= "05") )
    {
        console.log("hour values indicate time must be between 12:00 am - 5:00 am");
        alert("Meetings may not occur between 12:00am - 5:00am");
        return(false);
    }
    //Check for lunch.
    else if( (startHr >= "12" && startHr < "13") || ( ( endHr >= "12" && endMin > "00" ) && endHr <= "13"))
    {
        console.log("hour values indicate time requested must be between 12:00pm - 01:00pm");
        alert("Meetings may not occur between 12:00pm - 1:00pm");
        return(false);
    }
    //Check if meeting would span the restricted overnight period.
    else if( startHr >= "05" && endHr > "12")
    {
        console.log("Hour values indicate that the meetiung would go through lunch.");
        alert("Meetings may not extend through lunch.");
    }
    //Check if meeting would span the restricted lunch period.
    else if( startHr >= "13" && endHr >= "00")
    //Check to assure that meeting will start and end on the same calendar day.
    if(etime < stime)
    {
        alert("Meeting may not extend into next calendar day.");
        console.log("User attempted to set end time for calendar day that is not same as start time calendar day.");
        return (false);
    }
    console.log("Time does not appeaer to conflict with time constraints.");
    return (true);
}

function dupMeet()
{
    if(driver.numMeetings == 0) return (false);
    for(i = 0; i < driver.numMeetings; i++)
    {
        //for these purposes I have defined a duplicate meeting to be one in
        //which the meetings date, name and creator name are all equal.
        if(driver.meetings[i].event_name == name && driver.meetings[i].dateOfEvent == eDate
            && driver.meetings[i].creator == creator)
        {
            alert("This event has already been created!");
            console.log("Duplicat event detected *DBG");
            return(true);
        }
        else
        {
            console.log("Passed duplicate meeting check.");
            return(false);
        }
    }
}

function tryCreate()
{
    if(!checkDate())
    {
        alert("Please fix date error(s) and resubmit.");
        console.log("Date constraints failed *DBG");
        return (false);
    }
    else if(!checkTime())
    {
        alert("Please fix timer error(s) and resubmit.");
        console.log("Time constraints failed *DBG");
        return (false);
    }
    else if(dupMeet())
    {
        alert("Meeting already exists, unable to create duplicate.");
        console.log("Event not created.");
    }
    else
    {
        console.log("Attempting to call driver.addMeeting()");
        if(driver.addMeeting())
        {
            console.log("Meeting " + driver.meetings[driver.numMeetings - 1].name +
                        " has been created for " + driver.meetings[driver.numMeetings - 1].dateOfEvent);
        }
        //DEBUG Logs
        console.log(driver.meetings[0].name);
        console.log(driver.meetings[0].dateOfEvent);
        console.log(driver.meetings[0].stime);
        console.log(driver.meetings[0].etime);
    }
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
  events.arrayOfEvents.push(eventInfo);
  events.numOfEvents++;
}

/*function event_duration(start_time, end_time) {
  start_time = start_time.split(":");
  end_time = end_time.split(":");
  var start_date = new Date(0,0,0,start_time[0],start_time[1]);
  var end_date = new Date(0,0,0,end_time[0],end_time[1]);
  var duration = end_date.getTime() - start_date.getTime();//this will be in milliseconds
  var minutes = Math.floor((duration/1000)/60);
  var num_of_time_slots = Math.floor(minutes/20);
  return(num_of_time_slots);
}*/

function eventSubmit(){
  getData();
  addMeeting();
  tableCreate();
  //console.log(event_duration(stime,etime));
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







/*var driver =
{
    meetings    : [],
    numMeetings : 0,
    knownPersons: [],
    numPersons  : 0
}
    prototype.addMeeting : function() THIS IS THE PROBLEM YOU CANNOT DEFINE A FUCNTION IN A OBJECT LIKE THIS CUZ WHEN YOU MAKE THE OBJECT IT GOES AWAY
    {
        var meeting =
        {
             name:event_name,
             date:date,
             creator:creator,
             stime:stime,
             etime:etime,
             timeSlots:[],
             numTimeSlots:0,
             attendees:[],
             numAttend:1
        };

        var timeslot =
        {
            tsStime:"12:00",
            tsEtime:"12:20",
            attendees:[],//if person is in this array, they are available for this timeslot in the meeting
            numAttendees:0
        };

        this.meetings.push(meeting);


        console.log("Preparing to enter dupPersons(html:45)");
        console.log(dupPersons());

        if(!dupPersons())
        {
            //creates a person for the driver's knownPersons array.
            var person =
            {
                 firstname:creator,
                 lastname:""
            };
            console.log("Attempting to log the person");
            console.log(person.firstname);
            this.knownPersons.push(person);
            console.log(person.firstname + "Added to knownPersons[] *DBG");
            this.numPersons++;
        }
        this.meetings[this.numMeetings].attendees.push(person);
        this.numMeetings++;

        var startHr = Number(stime.slice(0, 2));
        var startMin = Number(stime.slice(3, 5));
        var endHr = Number(stime.slice(0, 2));
        var endMin = Number(stime.slice(3, 5));
        var deltaHr = endHr - startHr;
        var deltaMin = endMin - startMin;
        var totalMins = deltaMin + (deltaHr * 60);
        var numTimeslots = totalMins / 20;


    }
};*/
//run updateData() method to populate driver object from file
