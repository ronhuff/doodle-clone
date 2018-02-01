//createevent.js - I feel like this page can house the code for meetings.
//               - I recently learned that events are an actual thing in JS so
//               - perhaps this page should be renamed to meetings.js or some such.
//               - in any case, it's a start.





var event = {
    var eventName,
    var creator
    var person[creator] //some sort of data structure to house Person objects? can pop() on more.
    var times = [] //can house string objects(push(),pop() means we don't have to worry about size.)
                   //these strings would be similar to the ones described in person.js



};


function checkDate(date) // where date is MM/DD/YYYY
{
    if(date.slice(0,2) == 01 && date.slice(3,5) == 01) return (false)
    if(date.slice(0,2) == 07 && date.slice(3,5) == 04) return (false)
    if(date.slice(0,2) == 12 && date.slice(3,5) == 25) return (false)
    return (true)
}

function checkTime(date1, date2, time1, time2) // where time is hh:mm:ss & time1 is begin, time2 is end
{
    if(date1 != date2) return (false)
    if(time2 - time1 >= 24:00:00) return(false) // this means that the times requested would not fall on the same day
    if(time1 >= 00:00:00 && time2 <= 05:00:00) return (false) // 12:00 am - 05:00 am
    if(time1 >= 12:00:00 && time2 <= 13:00:00) return (false) // lunch.

}
