var meeting = {name:"", date:"", creator:"", stime:"HH:MM", etime:"HH:MM", timeSlots:[]};

var data;
var creator = "";
var event_name = "";
var date = "";
var stime = "";
var etime = "";


function exportData()
{
    console.log(driver.meetings.join(','));
    console.log(driver.numMeetings);
    console.log(driver.meetings[0].creator);
    console.log(driver.meetings[0].name);
}

function eventSubmit()
{
    populateData();
    tryCreate();
    console.log(event_duration(stime,etime));
    tableCreate();
    //data_table();
}

function populateData()
{
    data = document.forms["eventMaker"];

    creator = data["admin"].value;
    event_name = data["event"].value;
    date = data["date"].value;
    stime = data["stime"].value;
    etime = data["etime"].value;
}


//CREATION CONSTRAINTS
function checkDate()
{
    console.log("Entered CheckDate()");
    console.log(date);
    console.log(date.slice(5,7) + "/" + date.slice(8,10));
    if(date.slice(5,7) == 01 && date.slice(8,10) == 01)
    {
        alert("No meetings permitted to be scheduled on New Year's Day.");
        return (false);
    }
    if(date.slice(5,7) == 07 && date.slice(8,10) == 04)
    {
        alert("No meetings permitted to be scheduled on Independence Day.");
        return (false);
    }
    if(date.slice(5,7) == 12 && date.slice(8,10) == 25)
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
    //this means they are attempting to request a time from the next day which is disallowed.
    if(etime < stime)
    {
        alert("Meeting may not extend into next calendar day.");
        console.log("User attempted to set end time for calendar day that is not same as start time calendar day.");
        return (false);
    }
    return (true);
}

//DUPLICATE CHECK

//this will check for duplicate persons when the event is created. Will have to
//code another way to account for this for other cases.
function dupPersons()
{
    console.log("entered dupPersons(data1.js:78)");
    for(i = 0; i < driver.numPersons; i++)
    {
        if(driver.knownPersons[i].name == creator)
        {
            console.log("Person already exists, not adding to knownPersons[] *DBG");
            return(true);
        }
        else
        {
            console.log("New person does not exist, new person created.");
            return (false);
        }
    }
}
function dupMeet()
{
    for(i = 0; i < driver.numMeetings; i++)
    {
        if(driver.meetings[i].event_name == name && driver.meetings[i].date == date && driver.meetings[i].creator == creator)
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
        driver.addMeeting();
        console.log(driver.meetings[0].name);
        console.log(driver.meetings[0].date);
        console.log(driver.meetings[0].stime);
        console.log(driver.meetings[0].etime);
        /*
        console.log("Attempting driver.meetings.push()");
        console.log("current number of meetings: " + driver.numMeetings);
        driver.meetings.push(meeting = {name:, date:date, creator:creator, stime:stime, etime:etime});
        driver.numMeetings++;
        console.log("driver.numMeetings incremented. New numMeetings: " + driver.numMeetings);
        console.log(driver.meetings[0].name);
        console.log(driver.meetings[0].date);
        console.log(driver.meetings[0].stime);
        console.log(driver.meetings[0].etime);
        return (true);*/
    }
}




/*
class Rect
{
    constructor(x,y)
    {
        this.xyz = stuff;
        this.sdfsdf = asdfsadf;
    }
}
var rect1 = new Rect();
*/
function event_duration(start_time, end_time) {
  start_time = start_time.split(":");
  end_time = end_time.split(":");
  var start_date = new Date(0,0,0,start_time[0],start_time[1]);
  var end_date = new Date(0,0,0,end_time[0],end_time[1]);
  var duration = end_date.getTime() - start_date.getTime();//this will be in milliseconds
  var minutes = Math.floor((duration/1000)/60);
  var num_of_time_slots = Math.floor(minutes/20);
  return(num_of_time_slots);
}

function myFunction(input) {
    var x = document.createElement("TABLE");
    x.setAttribute("id", "myTable");
    document.body.appendChild(x);

    var y = document.createElement("TR");
    y.setAttribute("id", "myTr");
    document.getElementById("myTable").appendChild(y);

    var z = document.createElement("TD");
    var t = document.createTextNode();
    z.appendChild(t);
    document.getElementById("myTr").appendChild(z);
  }

  function tableCreate() {
      var start_time = stime.split(":");
      var start_date = new Date(0,0,0,start_time[0],start_time[1]);
      var newtime = start_date;
      var pasttime = start_date;
      var count = event_duration(stime, etime);
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
                  i == 1 && j == 1 ? td.setAttribute('rowSpan', '2') : null;
                  tr.appendChild(td)
              }
              else if (i === 0 && j === 1)
              {
                  var td = document.createElement('td');
                  td.appendChild(document.createTextNode("Start Time"))
                  i == 1 && j == 1 ? td.setAttribute('rowSpan', '2') : null;
                  tr.appendChild(td)
              }
              else if (i === 0 && j === 2)
              {
                var td = document.createElement('td');
                td.appendChild(document.createTextNode("End Time"))
                i == 1 && j == 1 ? td.setAttribute('rowSpan', '2') : null;
                tr.appendChild(td)
              }
              else if  (i === 1 && j === 0)
              {
                var td = document.createElement('td');
                td.appendChild(document.createTextNode(event_name))
                i == 1 && j == 1 ? td.setAttribute('rowSpan', '2') : null;
                tr.appendChild(td)
              }
              else if (i === 1 && j === 1)
              {
                var td = document.createElement('td');
                td.appendChild(document.createTextNode(stime))
                i == 1 && j == 1 ? td.setAttribute('rowSpan', '2') : null;
                tr.appendChild(td)
              }
              else
              {
                var td = document.createElement('td');
                td.appendChild(document.createTextNode(etime))
                i == 1 && j == 1 ? td.setAttribute('rowSpan', '2') : null;
                tr.appendChild(td)
              }
          }
          tbdy.appendChild(tr);
      }
      tbl.appendChild(tbdy);
      body.appendChild(tbl)
  }
/*function data_table() {
  var body = document.getElementsByTagName("body")[0];
  var tbl = document.createElement("table");
  var tblBody = document.createElement("tbody");
  var start_time = stime.split(":");
  var start_date = new Date(0,0,0,start_time[0],start_time[1]);
  var newtime = start_date;
  var minutes = 0;
  for(var i = 0; i < 1 ; i++)
  {
    var row = document.createElement("tr");
    for(var j =0; j <= event_duration(stime,etime); j++)
    {
      var cell = document.createElement("td");
      minutes = newtime.getMinutes();
      newtime = newtime.setMinutes(minutes + 20)
      var cellText = document.createTextNode(newtime);
      cell.appendChild(cellText);
      row.appendChild(cell);
    }
    tblBody.appendChild(row);
  }
  tbl.appendChild(tblBody);
  body.append(tbl);
  tbl.setAttribute("border", "2");
}*/
