Functions:

@brief - getData() retrieves the values from the eventMaker form and assigns them to JavaScript variables.
function getData()

@brief - addEvent() assigns values to eventInfo properties, performs date and duplicate meeting constraint checks.
@return bool - True if date & time checks passed, person and event counters incremented, event added to events.arrayOfEvents. Else, false.
function addEvent(arrayOfSlots)

@brief - checkDate() ensures that Jan 01, Jul 04 & Dec 25 are not able to have meetings.
@return bool - True if dates are ok, false if one is a holiday.
function checkDate()

@brief dupMeet() checks if an event exists with the same name.
@return bool - True if no duplicate exists. False if a duplicate DOES exist.
function dupMeet()

@brief enteringEvent calls getData() as well as addEvent(popTimeSlots).
@param array - The group of selected timeslots.
function enteringEvent(popTimeSlots)

@brief storeData() stringifies the events object data and stores it in localStorage.
function storeData()

@brief gettingData() retrieves a string object from localStorage with key “objectString”. It parses the string and assigns that object to events.

Objects:

events:
	.arrayOfEvents: [] @brief - This will hold eventInfo objects.
	.numOfEvents

eventInfo:
	.creator
	.nameOfEvent
	.dateOfEvent
	.timeSlots: []
	.numOfTimeSlots
	.peopleAttending: []
	.numOfPeopleAttending:

personInfo:
	.personsName
	.personsAvailability: []
