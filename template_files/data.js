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

runChecks = function() {
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
  if (creator != "Bardas" && creator != "Slagle" && creator != "Huff") {
    //When "Something failed" shows up at the console, you'll know this test failed.
    //You'll make your own console.log() output statements to test shit.
    console.log("Something failed");

    //Returns false because something failed.
    return (false);
  }
  //More if statements for each test on event name / date / admin constraints you'll write
  //...
  //...
  //...
  if(!checkDate(date))
  {
      console.log("Date failed")
      return (false);
  }
  if(!checkTime(stime, etime))
  {
      console.log("Time failed")
      return (false);
  }
  //If none of the tests you wrote fail, this code runs.
  else {
    //If "Everything passed" shows up in the console, all tests you wrote passed.
    console.log("Everything passed");

    //This is still return 'false', or else the page will refresh, which is inconvenient for testing.
    //Eventually we will return 'true', and the data will be sent to our file for I/O when you finish tests.
    return false;
  }
}
