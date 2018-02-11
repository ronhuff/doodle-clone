
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
        console.log(startHr, startMin, endHr, endMin);

        meeting.totalMins = (((endHr - startHr) * 60) + (endMin - startMin));
        console.log(meeting.totalMins);

        meeting.numTimeSlots = ( meeting.totalMins / 20 );
        console.log("TimeSlots = " + meeting.numTimeSlots);

        //TODO: see if this would be a good place to ensure meeting
        //      attendees as well as timeslot attendees are populated.
        //      perhaps not all can be poplated here but at LEAST the creator.
        var t1 = startHr;
        var t2 = startMin;
        var t3 = endHr;
        var t4 = endMin;


        console.log("Preparing to enter dupPersons(html:58) *DBG");

        //This block ensures that we cannot have any duplicate persons.
        if(!dupPersons)
        {
            var person = {firstname:"", lastname:creator, isAttendee:true};
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

            this.meetings.push(meeting);
            this.meetings[this.numMeetings].attendees.push(person);


        }
        for(i = 0; i < this.meetings[this.numMeetings].numTimeSlots; i++)
        {
            console.log("ev_demo.html:119 *DBG");
            //if(( (t1 != t3) && t2 !>))
            var testBool = (t2 + 20 == 0);
            var timeslot =
            {

                stime:String(t1) + ':' + String(t2),//these are default values for templating purposes and may not be necessary.
                /*if( t2 + 20 == 0)
                {
                    t1++,//This accounts for starting at 4:40 and ending at 5:00
                }*/

                etime: testBool ? (String(t1++) + ':' + String(t2)) : (String(t1) + ':' + String(t2 + 20)),
                startHr:t1,
                endHr:t3,
                endMin:t4,
                attendees:[],//if person is in this array, they are available for this timeslot in the meeting
                numAttendees:1
            };

            console.log("pushing timeslots ev_demo.html:137 *DBG");
            timeslot.attendees.push(person);
            meeting.timeSlots.push(timeslot);

        }

        /*
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
            this.meetings[this.numMeetings].attendees.push(person);
            //TODO:Perhaps this would be a good place to increment numattend.
            //Remember to implement this elsewhere as well.
            this.numMeetings++;
        }
        else
        {
            this.meetings[this.numMeetings].attendees.push(person);
            this.numMeetings++;
        }*/
        this.numMeetings++;
        return (true);
    }
};
