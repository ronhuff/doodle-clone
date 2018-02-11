var eventInfo = {
  creator: "",
  nameOfEvent: "",
  dateOfEvent: "",
  startingTime: "HH:MM",
  endTime: "HH:MM",
  numOfTimeSlots: 0,
  peopleAttending: [],
  numOfPeopleAttending: 0
};
var data;
var maker = "";
var nEvent = "";
var eDate = "";
var sTime = "";
var eTime = "";
var nSlots = 0;

function getData(){
  data = document.forms["eventMaker"];
  maker = data["admin"].value;
  nEvent = data["event"].value;
  eDate = data["date"].value;
  sTime = data["stime"].value;
  eTime = data["etime"].value;
  //nSlots = event_duration(sTime,eTime);
}

function addMeeting(){
  var eventInfo = {
    creator: maker,
    nameOfEvent: nEvent,
    dateOfEvent: eDate,
    startingTime: sTime,
    endTime: eTime,
    numOfTimeSlots: nSlots,
    peopleAttending: [],
    numOfPeopleAttending: 0
  };
  events.arrayOfEvents.push(eventInfo);
  events.numOfEvents++;
}

/*function event_duration(start_time, end_time) {
  start_time = start_time.split(":");
  end_time = end_time.split(":");
  var start_date = new Date(0,0,0,start_time[0],start_time[1]);
  var end_date = new Date(0,0,0,end_time[0],end_time[1]);
  var duration = end_date.getTime() - start_date.getTime();//this will be in milliseconds
  var minutes = Math.floor((duration/1000)/60);
  var num_of_time_slots = Math.floor(minutes/20);
  return(num_of_time_slots);
}*/

function eventSubmit(){
  getData();
  addMeeting();
  tableCreate();
  //console.log(event_duration(stime,etime));
}

function tableCreate() {
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
                tr.appendChild(td)
            }
            else if (i === 0 && j === 1)
            {
                var td = document.createElement('td');
                td.appendChild(document.createTextNode("Start Time"))
                tr.appendChild(td)
            }
            else if (i === 0 && j === 2)
            {
              var td = document.createElement('td');
              td.appendChild(document.createTextNode("End Time"))
              tr.appendChild(td)
            }
            else if  (i === 1 && j === 0)
            {
              var td = document.createElement('td');
              td.appendChild(document.createTextNode(nEvent))
              tr.appendChild(td)
            }
            else if (i === 1 && j === 1)
            {
              var td = document.createElement('td');
              td.appendChild(document.createTextNode(sTime))
              tr.appendChild(td)
            }
            else
            {
              var td = document.createElement('td');
              td.appendChild(document.createTextNode(eTime))
              tr.appendChild(td)
            }
        }
        tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
    body.appendChild(tbl)
}
