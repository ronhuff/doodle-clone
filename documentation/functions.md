Functions:

@brief - dropdownMenu() acts as an onclick action for the HTML dropdown menu. function dropdownMenu()

@brief - init() initializer function to create button events as well as populate timeslots and HTML buttons. This will call in order, addButtonEvents(), populateTimeSlots() and populateButtonHTML()
function init()

@brief - addButtonEvents() defines event listeners for the buttons.
function addButtonEvents()

@brief - populateTimeSlots() pushes timeslots into timeSlots array.
function populateTimeSlots()

@brief - eventSubmit() determines which timeslots are selected and adds them to a selectedList of timeSlots.
function eventSubmit()

@brief - populateButtonHTML() adds correct time text to buttons, including accounting for 12 or 24 hour mode.
function populateButtonHTML()

@brief - toogleMode() switches twelveHourMode true/false and then repopulates the time slot button text fields.

Variables:

buttons: document.querySelectorAll(".time")
timeSlots: []
selectedList: []
twelveHourMode: false
