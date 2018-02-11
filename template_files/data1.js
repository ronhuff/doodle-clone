/*******************************************************************************
    @author - Ron Huff
    @file - data1.js
    @lastModified - 2-9-2018
    @brief - This file houses the code necessary to create, store and otherwise
             manage meetings, persons & timeslots. As well as assure that all
             constraints are met.
*******************************************************************************/

//TODO: TIMESLOTS. Investigate exporting to CSV.
// Global declarations, perhaps unnecessary.


//NOTE!!!: readFromFile(string) && exportToSpread(object) are defined at bottom of page!!

var meeting = {name:"", date:"", creator:"", stime:"HH:MM", etime:"HH:MM", timeSlots:[]};

var data;
var creator = "";
var event_name = "";
var date = "";
var stime = "";
var etime = "";

// takes an object as parameter and returns a string which should then be written to file.
// object should be the driver object from the html page.
function exportData(object)
{
    if(object.typeof == "object")
    {
        return(JSON.stringify);
    }
    else
    {
        console.log(object + " does not appear to be an object. data1.js:21 *DBG");
        return(false);
    }
}

//called when user clicks button.
//populates data and attempts to create/store all necessary data.
function eventSubmit()
{
    populateData();
    tryCreate();
}

//takes data from the html and assigns it to variables JS can easier work with.
function populateData()
{
    data = document.forms["eventMaker"];

    creator = data["admin"].value;
    event_name = data["event_name"].value;
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

    //New Year's Day.
    if(date.slice(5,7) == "01" && date.slice(8,10) == "01")
    {
        alert("No meetings permitted to be scheduled on New Year's Day.");
        return (false);
    }
    //Independence Day
    if(date.slice(5,7) == "07" && date.slice(8,10) == "04")
    {
        alert("No meetings permitted to be scheduled on Independence Day.");
        return (false);
    }
    //Christmas Day
    if(date.slice(5,7) == "12" && date.slice(8,10) == "25")
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

//DUPLICATE CHECK

//this will check for duplicate persons when the event is created. Will have to
//code another way to account for this for other cases.
function dupPersons()
{
    console.log("entered dupPersons(data1.js:85)");
    //Check to make sure persons exist.
    if(driver.numPersons == 0) return (false);
    else
    {   //loops through known persons. if creator's name matches a name in knownPersons then dupPersons() returns false. else true.
        for(i = 0; i < driver.numPersons; i++)
        {
            console.log(driver.knownPersons[i].lastname);
            console.log("Creator = " + creator + " data1.js:90 *DBG");
            console.log("driver.knownPersons[i].lastname = " + driver.knownPersons[i].lastname);
            if(driver.knownPersons[i].lastname == creator)
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
}

//Checks to see if the user is attempting to create a meeting that is already in existance.
function dupMeet()
{
    if(driver.numMeetings == 0) return (false);
    for(i = 0; i < driver.numMeetings; i++)
    {
        //for these purposes I have defined a duplicate meeting to be one in
        //which the meetings date, name and creator name are all equal.
        if(driver.meetings[i].event_name == name && driver.meetings[i].date == date
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

//tryCreate() will check for any constraints violations and then attempt to call driver.addMeeting()
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
                        " has been created for " + driver.meetings[driver.numMeetings - 1].date);
        }
        //DEBUG Logs
        console.log(driver.meetings[0].name);
        console.log(driver.meetings[0].date);
        console.log(driver.meetings[0].stime);
        console.log(driver.meetings[0].etime);
    }
}

//readFromFile() takes a string from the file, passes it to JSON.parse()
//this function be used in the html file e.g. driver = readFromFile(stringFromSpreadSheet) etc.
function readFromFile(string)
{
    return(JSON.parse(string));
    //doStuff
}

//exportToSpread() takes the driver object, passes to JSON.stringify()
//This function should be used in the html for some event such as window.onbeforeunload = exportToSpread(driver);//PSUEDOCODE!!
function exportToSpread(object)
{
    var stringToWrite = JSON.stringify(object);
    return(stringToWrite);
}

//this function should only run if the person object passed in has property .isAttendee: true
//paramater may have to be this?? depends on the calling situation.
//Meeting CAN be some useless variable if necessary(e.g. false) however, it can also be a meeting object.
/*
function findConflict(person, meeting = false)
{
    if(!meeting)//this block would be for during a creation step and I think should have access to stime and etime.
    {
        for(i = 0; i < driver.numMeetings; i++)
        {
            for(j = 0; j < driver.meetings[i].numAttend; j++)
            {
                if(person.lastname == driver.meetings[i].persons[j].name)
                {
                    console.log("Person " + person.lastname + " is an attendee in meeting " + driver.meetings[i].name + ". data1.js:259");
                    for(k = 0; k < driver.meetings[i].numTimeSlots; k++)
                    {
                        if(driver.meetings[i].timeSlots[k].stime)
                    }
                    break;
                }
            }
        }
    }
}
*/
