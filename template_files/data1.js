/*******************************************************************************
    @author - Ron Huff
    @file - data1.js
    @lastModified - 2-9-2018
    @brief - This file houses the code necessary to create, store and otherwise
             manage meetings, persons & timeslots. As well as assure that all
             constraints are met.
*******************************************************************************/

//TODO:

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
        console.log(object + " does not appear to be an object. data1.js:37 *DBG");
        return(false);
    }
}

//setTimes() will set appropriate stime and etime.
function setTimes(buttonid)
{
    console.log("Entered setTimes! data1.js:44 *DBG")
    var data = document.getElementById(buttonid);
    console.log(buttonid + "data1.js:46");
    //All these values are strings at this point.
    console.log(buttonid[0] + "data1.js:48");
    if(buttonid[0] != "1" && buttonid[0] != "2")
    {
        console.log("meeting.stime = " + meeting.stime);
        console.log("meeting.etime = " + meeting.etime);

        if(meeting.stime == "HH:MM")
        {
            meeting.stime = "0" + buttonid[0] + ":" + buttonid[buttonid.length - 1] + "0";
        }
        else
        {
            console.log(buttonid[buttonid.length - 1]);
            meeting.etime = "0" + buttonid[0] + ":" + buttonid[buttonid.length - 1] + "0";
            console.log(meeting.etime);
            return;
        }
    }
    else
    {
        if(meeting.stime == "HH:MM")
        {
            meeting.stime = buttonid[0] + buttonid[1] + ":" + buttonid[buttonid.length - 1] + "0";
        }
        else
        {
            meeting.etime = buttonid[0] + buttonid[1] + ":" + buttonid[buttonid.length - 1] + "0";
            return;
        }
    }
    /*
    if(stime == "") stime = newTime;
    else etime = newTime;*/
    console.log("stime = " + stime + " etime = " + etime);
}

//called when user clicks button.
//populates data and attempts to create/store all necessary data.
function eventSubmit()
{
    //console.log(populateData() == true);
    if(populateData()) tryCreate();

    driver.meetings[driver.numMeetings - 1].stime = meeting.stime;
    driver.meetings[driver.numMeetings - 1].etime = meeting.etime;
    console.log(driver.meetings[driver.numMeetings]);
    createTimeslots(driver.meetings[driver.numMeetings - 1]);
}

//takes data from the html and assigns it to variables JS can easier work with.
function populateData()
{
    data = document.forms["eventMaker"];

    //All these values are strings at this point.
    creator = data["admin"].value;
    event_name = data["event_name"].value;
    date = data["date"].value;
    if(meeting.stime == "HH:MM" || meeting.etime == "HH:MM")
    {
        alert("Please select beginning and end times before creating the event.");
        return(false);
    }
    return(true);
}

//CREATION CONSTRAINTS
function checkDate()
{
    console.log("Entered CheckDate(). data1.js:103");

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
    console.log("Entered checkTime(). data1.js:91");

    //Convert these values to Numbers to make math easier.
    var startHr = Number(meeting.stime.slice(0, 2));
    var startMin = Number(meeting.stime.slice(3, 5));
    var endHr = Number(meeting.etime.slice(0, 2));
    var endMin = Number(meeting.etime.slice(3, 5));

    if( (( startMin % 20 == 0 ) && ( endMin % 20 == 0 )) == false )
    {
        console.log("startMin || endMin not on timeslot");
        alert("Meeting must begin and end on the hour or 20 minute increments thereof.");
        return(false);
    }

    //Check for overnight
    console.log(stime + etime);
    console.log(startHr + " " + endHr);
    if( (startHr >= "00" && startHr < "05") || (endHr > "00" && endHr < "05") )
    {
        console.log("Error: Meeting Start || End overnight.");
        alert("Meetings may not occur between 12:00am - 5:00am");
        return(false);
    }
    //Check for lunch.
    else if( (startHr >= "12" && startHr < "13") || ( ( endHr >= "12" && endMin > "00" ) && endHr <= "13"))
    {
        console.log("Error: Meeting Start || End lunch.");
        alert("Meetings may not occur between 12:00pm - 1:00pm");
        return(false);
    }

    //Check if meeting would span the restricted overnight period.
    //NOTE: Even though they can choose only one day, a user could attempt to schedule
    //      an end time in the AM even though their begin time is PM. This will account for that.
    //      Also, we can use >= 13 because we already checked for meetings that span lunch.
    else if( startHr >= "13" && endHr < 13)
    {
        console.log(startHr + " " + endHr);
        console.log("Error: Meeting end time >=");
        alert("Meetings must begin and end on the same calendar day.");
        return(false);
    }

    //Check if meeting would span the restricted lunch period.
    else if( (startHr >= "05" && startHr < "12") && endHr > "13")
    {
        console.log("Hour values indicate that the meeting would go through lunch.");
        alert("Meetings may not extend through lunch.");
        return(false);
    }

    //Check to assure that meeting will start and end on the same calendar day.
    //Perhaps redundant now but it's not broke so we won't fix it yet.
    if(etime < stime)
    {
        alert("Meeting may not extend into next calendar day.");
        console.log("User attempted to set end time for calendar day that is not same as start time calendar day.");
        return (false);
    }
    console.log("Time does not appear to conflict with time constraints.");
    return (true);
}

//DUPLICATE CHECK

//this will check for duplicate persons when the event is created. Will have to
//code another way to account for this for other cases.
function dupPersons()
{
    console.log("Entered dupPersons(). data1.js:159");
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
            console.log("Duplicate event detected *DBG");
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
        console.log("Date constraints failed *DBG");
        return (false);
    }
    else if(!checkTime())
    {
        console.log("Time constraints failed *DBG");
        return (false);
    }
    else if(dupMeet())
    {
        console.log("Event not created.");
        return(false);
    }
    else
    {
        console.log("Attempting to call driver.addMeeting()");
        if(driver.addMeeting())
        {
            //logMeetingToConsole();
            return(true);
        }
        console.log("Unknown Error: driver.addMeetings() must have returned false");
        return(false);
        //DEBUG Logs
        //console.log(driver.meetings[0].name);
        //console.log(driver.meetings[0].date);
        //console.log(driver.meetings[0].stime);
        //console.log(driver.meetings[0].etime);
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

function createTimeslots(meeting)
{
    console.log("Entered timeslots creation data1.js:312");
    console.log(meeting);
    console.log(meeting.etime);
    var t1 = Number(meeting.stime.slice(0, 2));
    var t2 = Number(meeting.stime.slice(3, 5));
    var endHr = Number(meeting.etime.slice(0, 2));
    var endMin = Number(meeting.etime.slice(3, 5));
    //console.log(startHr, startMin, endHr, endMin);

    var totalMins = (((endHr - t1) * 60) + (endMin - t2));

    meeting.numTimeSlots = ( totalMins / 20 );
    for(i = 0; i < meeting.numTimeSlots; i++)
    {
        if(t2 == 0)
        {
            t2 = "00";
        }
        var timeslot =
        {
            stime:String(t1) + ':' + String(t2),//these are default values for templating purposes and may not be necessary.
            etime:"",
            attendees:[],//if person is in this array, they are available for this timeslot in the meeting
            numAttendees:1
        };

        t2 = Number(t2) + 20;
        if(t2 >= 60)
        {
            t2 = 0;
            t1++;
            timeslot.etime = String(t1) + ':' + "00";
            timeslot.endHr = t1;
            timeslot.endMin = t2;
        }
        else
        {
            timeslot.etime = String(t1) + ':' + String(t2);
            timeslot.endHr = t1;
            timeslot.endMin = t2;
        }
        timeslot.attendees.push(meeting.attendees[0]);//since this is at creation we can take index 0(the creator)
        if(timeslot.startMin == "00") timeslot.startMin = 0;
        meeting.timeSlots.push(timeslot);
    }
}

function logMeetingToConsole(meeting)
{
    var index = (driver.numMeetings - 1);
    console.log(meeting.attendees[0].lastname + " is an attendee of meeting " + meeting.name + " on " + meeting.date + ". It's " + meeting.attendees[0].isAttendee + " driver.js:72 *DBG");
    console.log("Meeting " + meeting.name +
                " has been created for " + meeting.date
                + "beginning at " + meeting.stime +
                " and ending at " + meeting.etime);
    console.log("This meeting ought to have" + meeting.numTimeSlots + " timeslots. data1.js:335");

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
