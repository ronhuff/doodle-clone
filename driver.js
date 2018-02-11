//NOTE: There are some console.log()'s commented out below they can be handy for debugging purposes.

var driver =
{
    meetings    : [],
    numMeetings : 0,
    knownPersons: [],
    numPersons  : 0,
    addMeeting  : function()
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
            tsStime:"12:00",//these are default values for templating purposes and may not be necessary.
            tsEtime:"12:20",
            attendees:[],//if person is in this array, they are available for this timeslot in the meeting
            numAttendees:0
        };

        //These variables enable more robust time checking.
        //They may add more clutter but for now they shall remain.

        var startHr = Number(stime.slice(0, 2));
        var startMin = Number(stime.slice(3, 5));
        var endHr = Number(etime.slice(0, 2));
        var endMin = Number(etime.slice(3, 5));
        //console.log(startHr, startMin, endHr, endMin);

        meeting.totalMins = (((endHr - startHr) * 60) + (endMin - startMin));

        meeting.numTimeSlots = ( meeting.totalMins / 20 );
        //console.log("TimeSlots = " + meeting.numTimeSlots);

        //TODO: see if this would be a good place to ensure meeting
        //      attendees as well as timeslot attendees are populated.
        //      perhaps not all can be poplated here but at LEAST the creator.

        var t1 = startHr;
        var t2 = startMin;
        var t3 = endHr;
        var t4 = endMin;

        //This block ensures that we cannot have any duplicate persons.
        if(!dupPersons())
        {
            var person = {firstname:"", lastname:creator, isAttendee:true};
            this.knownPersons.push(person);
            this.numPersons++;
        }
        else
        {
            for(i = 0; i < this.numPersons; i++)
            {
                if(this.knownPersons[i].lastname == creator)
                {
                    var person = this.knownPersons[i];
                    break;
                }
            }
        person.isAttendee = true;
        }
        console.log(person.lastname + " is an attendee of meeting " + meeting.name + " on " + meeting.date + ". It's " + person.isAttendee + " driver.js:72 *DBG");
        this.meetings.push(meeting);
        this.meetings[this.numMeetings].attendees.push(person);
        for(i = 0; i < this.meetings[this.numMeetings].numTimeSlots; i++)
        {
            if(t2 == 0)
            {
                t2 = "00";
            }
            var timeslot =
            {
                stime:String(t1) + ':' + String(t2),//these are default values for templating purposes and may not be necessary.
                etime:"",
                startHr:t1,
                startMin:t2,
                endHr:0,
                endMin:0,
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
            timeslot.attendees.push(person);
            if(timeslot.startMin == "00") timeslot.startMin = 0;
            meeting.timeSlots.push(timeslot);
        }

        this.numMeetings++;
        return (true);
    }
};
