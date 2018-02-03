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
    return false;
  }
  //More if statements for each test on event name / date / admin constraints you'll write
  //...
  //...
  //...

  //If none of the tests you wrote fail, this code runs.
  else {
    //If "Everything passed" shows up in the console, all tests you wrote passed.
    console.log("Everything passed");

    //This is still return 'false', or else the page will refresh, which is inconvenient for testing.
    //Eventually we will return 'true', and the data will be sent to our file for I/O when you finish tests.
    return false;
  }
}
