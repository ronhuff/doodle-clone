//createevent.js - I feel like this page can house the code for meetings.
//               - I recently learned that events are an actual thing in JS so
//               - perhaps this page should be renamed to meetings.js or some such.
//               - in any case, it's a start.

//               Parameter, function and object names are all assumed, generic and mutable.
//               ALL CODE SHOULD BE PRESUMED AS PSEUDOCODE FOR NOW. -=- 2-2-18 ronhuff





var event = {
    var eventName = null,
    var creator,
    var person[creator], //some sort of data structure to house Person objects? can pop() on more.
    var isContig, //true if no breaks between time1 & time2, otherwise false. TODO: code timeSlots, etc.
    var times = [], //can house string objects(push(),pop() means we don't have to worry about size.)
                   //these strings would be similar to the ones described in person.js

    var time12hr = false; // we should set this by default since it will be easier to format 24 hr time.
                          // if the user prefers 12 hr time, this variable can be switched and a displayEventTime() function
                          // could simply check this variable before displaying the time.


};

function validEvent(event) //take in an event object? return true/false if the event is valid as created and can be stored.
{
    if(!checkDate(event.date) || !checkTime(event.date1, event.date2, event.time1, event.time2)) return(false);

}

function checkDate(date) // where date is MM/DD/YYYY
{
    if(date.slice(0,2) == 01 && date.slice(3,5) == 01)
    {
        alert("No meetings permitted to be scheduled on New Year's Day.")
        return (false)
    }
    if(date.slice(0,2) == 07 && date.slice(3,5) == 04)
    {
        alert("No meetings permitted to be scheduled on Independence Day.")
        return (false)
    }
    if(date.slice(0,2) == 12 && date.slice(3,5) == 25)
    {
        alert("No meetings permitted to be scheduled on Christmas Day.")
    }
    return (true)
}

function checkTime(date1, date2, time1, time2) // where time is hh:mm:ss & time1 is begin, time2 is end
{
    if(date1.slice(3,5) != date2.slice(3.5)
    {
        alert("Invalid input: Start and end times must occur on the same date!");
        return (false) // meeting begins and ends on different days. Disallowed.
    }
    if(date1 != date2) return (false) // perhaps redundant and obsolete version now due to the above lines of code.
    if(time2 - time1 >= 24:00:00) return(false) // this means that the times requested would not fall on the same day also redundant/obsolete

    if(time1 >= 00:00:00 && time2 <= 05:00:00)// 12:00 am - 05:00 am
    {
        alert("No meetings permitted between midnight and 5 am.")
        return (false)
    }
    if(time1 >= 12:00:00 && time2 <= 13:00:00) return (false) // lunch.
    {
        alert("No meetings permitted during lunch.")
    }

}
