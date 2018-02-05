//TODO: Documentation, Figure out how to make the page store and retain information until navigate away.


var meeting = {name:"", stime:"HH:MM", etime:"HH:MM", timeSlots:[], creator:""};

var driver = {meetings:[],
              numMeetings:0,
              knownPersons:[],
              numPersons:0,
              addMeeting()
              {
                  alert("Entered addMeeting() *DBG");

                  var data = document.forms["eventMaker"];

                  var creator = data["admin"].value;

                  var event_name = data["event"].value;

                  var date = data["date"].value;

                  var stime = data["stime"].value;
                  var etime = data["etime"].value;
                  console.log("admin".value + "event".value + "date".value + "stime".value + "etime".value  );
                  alert("Stop time. *DBG");
                  meetings.push(meeting = {name:"event", stime:"stime", etime:"etime", timeSlots:[], creator:""});
                  driver.numMeetings++;
              }
          };

var timeSlot = {stime:"HH:MM", etime:"HH:MM", attendees:[], numAtt:0};

var person = {firstname:"", lastname:"" };


//General event date and time creation constraints below.
function checkDate(date)
{
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
    return (true);
}

function checkTime(time1, time2) // where time is HH:MM && time1 is begin, time2 is end
{
    //this means they are attempting to request a time from the next day which is disallowed.
    if(time2 < time1)
    {
        alert("Meeting may not extend into next calendar day.");
        return (false);
    }
    return (true);
}

function dupMeet(storedEventObj, newEventObj, numMeetings)
{
    for(i = 0; i < numMeetings; i++)
    {
        if(storedEventObj.name == newEventObj.name && storedEventObj.date == newEventObj.date && newEventObj.creator == storedEventObj.creator)
        {
            alert("This event has already been created!");
            return(true);
        }
    }
}
//runChecks() is going to almost function as a driver object.  That being said,
//I feel like we should implement some sort of driver object that will be able to modify meetings & person objects, etc.
createEvent = function() {
  //Make a Document object for the data from the form when submit is clicked.
  var data = document.forms["eventMaker"];

  //Extract data from variable 'data' into sub-sections.
  //Variable for admin name.
  var creator = data["admin"].value;

  //Varibale for event name. Note that 'event' is already a keyword in js.
  var event_name = data["event"].value;

  //Variable for date value.
  //Note: as of right now, this returns a String variable that looks like: "YYYY-MM-DD"
  //It is possible to change how this String is output, but it would probably be easier to adjust to it.
  var date = data["date"].value;

  //Variable for start time value
  //return format is HH:MM and it seems that you cannot do operations on them
  //ie var timeTaken = etime - stime;
  //However, booleans such as the one on line 55 will work.
  var stime = data["stime"].value;
  var etime = data["etime"].value;

  console.log(etime > stime);
  console.log(date);

  //----------------------------------------------------------------------------
  //+++++++++++++++++++++++    BEGIN TEST CODE        ++++++++++++++++++++++++++
  //----------------------------------------------------------------------------

  //Example test:



  if (creator != "Bardas" && creator != "Slagle" && creator != "Huff")
  {
    //When "Something failed" shows up at the console, you'll know this test failed.
    //You'll make your own console.log() output statements to test shit.
    alert("You are not authorized to access this service.");
    console.log("Creator name entered is not one of the allowed names.");

    //Returns false because something failed.
    return (false);
  }
  //More if statements for each test on event name / date / admin constraints you'll write
  //...
  //...
  //...
  if(!checkDate(date))
  {
      alert("Unable to schedule meeting on this date.");
      console.log("Date failed");
      return (false);
  }
  else if(!checkTime(stime, etime))
  {
      alert("Unable to schedule meetings with the given end time.");
      console.log("Time failed");
      return (false);
  }
  alert("Constraints seem to check out *DBG");
  //Date and times do not violate constraints...attempting to continue.

  driver.addMeeting();
  //driver.meetings.push(meeting = {name:event_name, creator:creator, stime:stime, etime:etime});

}
  //If none of the tests you wrote fail, this code runs.
  /*else
  {
    //If "Everything passed" shows up in the console, all tests you wrote passed.
    console.log("Everything passed");
    console.log("Attempting to create meeting event....*DBG");
    if(driver.numMeetings > 0)
    {
        alert("Entered numMeetings > 0 block");
        console.log("Entered numMeetings > 0 block");
        //Checks if meeting date, name and creator properties are equal to the same properties already in our meetings[] array.
        if(dupMeet(driver.meetings[i], meeting = {name:event_name, creator:creator, stime:stime, etime:etime}, driver.numMeetings))
        {
            alert("This event already has already been created.");
            return (false); //for testing purposes, later we will be adding other things I"m sure.
        }
        else
        {
           console.log("Attempting to addMeeting() *DBG");
        }
    }
    driver.meetings.push(meeting = {name:event_name, creator:creator, stime:stime, etime:etime});
    driver.numMeetings++;
    alert("numMeetings = " + numMeetings + " *DBG");
    //This is still return 'false', or else the page will refresh, which is inconvenient for testing.
    //Eventually we will return 'true', and the data will be sent to our file for I/O when you finish tests.
    return false;
}*/
