// display current day on the page
let currentDay = moment().format("dddd, MMMM Do YYYY");
$("#currentDay").text(currentDay);

// set the start time for the calendar
let startTime = moment('9am', 'hA');

// set the finish time for the calendar
let finishTime = moment('5pm', 'hA');

// function that creates the time blocks
function createTimeBlocks() {
    let i = startTime;
    while (moment(i).isSameOrBefore(finishTime)) {
        //create a row for each hour
        let timeBlock = $("<div>").addClass("row");
        //display the hour
        let timeDisplay = $("<div>")
            .addClass("col-2 col-s-3 hour")
            .text(moment(i).format("hA"));
        // add textarea
        let eventDetails = $("<textarea>")
            .addClass("col-8 eventInput");
        // add save button for each row
        let saveBtn = $("<button>").addClass("col-2 saveBtn");
        let saveicon = $("<i></i>").addClass("fa-regular fa-floppy-disk");
        saveBtn.append(saveicon);
        // append each time block to the container
        $(".container").append(timeBlock);
        timeBlock.append(timeDisplay, eventDetails, saveBtn);
        // increase by one hour and create the next time block
        i = moment(i).add(1, 'h');
    };
    saveEvents();
    colorCode();
};

// function that checks if the if each time block is in the past, present or future and sets a different background accordingly

function colorCode() {
    $(".hour").each(function () {
        if (moment($(this).text(), "hA").isBefore(moment(), "hour")) {
            $(this).siblings().addClass("past");
        } else if (moment($(this).text(), "hA").isAfter(moment(), "hour")) {
            $(this).siblings("textarea").addClass("future");
        } else $(this).siblings().addClass("present");
    });
}


// function that saves events in the local storage
function saveEvents() {
    //add event listener to the save buttons
    $(".saveBtn").on("click", function () {
        //the saved event list is parsed as an object
        let currentEventList = JSON.parse(localStorage.getItem("updatedEventList"));
        console.log(currentEventList);
        // if there are no entries in the list, the new current list is set to an empty array
        if (currentEventList === null) currentEventList = [];
        // get the current day + hor of the time block
        let eventDate = `${moment().format("DD MM YY")} ${$(this).siblings(".hour").text()}`
        // get the calendar activity's iput
        let savedEventDetail = $(this).siblings("textarea").val();
        // check if there's already an entry for that day/time
        let existingEntryIndex = currentEventList.findIndex(el => el.eventDate === eventDate)
        console.log(existingEntryIndex);
        // if there's no previous entry, add a new object witth the event details in the array
        if (existingEntryIndex === -1) {
            let newEvent = {
                eventDate: eventDate,
                eventActivity: savedEventDetail
            }
            localStorage.setItem("newEvent", JSON.stringify(newEvent));
            currentEventList.push(newEvent);
            //else just update the existing entry
        } else currentEventList[existingEntryIndex].eventActivity = savedEventDetail;
        // finally update the event list object
        localStorage.setItem("updatedEventList", JSON.stringify(currentEventList));
    });
};

// function that displays all the saved events currently in the local storage
function displaySavedEvents() {
    $(".eventInput").each(function () {
        timeBlock = `${moment().format("DD MM YY")} ${$(this).siblings(".hour").text()}`;
        let listToDisplay = JSON.parse(localStorage.getItem("updatedEventList"));
        if (listToDisplay !== null) {
            let existingIndex = listToDisplay.findIndex(e => e.eventDate === timeBlock);
            if (existingIndex !== -1) {
                $(this).text(listToDisplay[existingIndex].eventActivity);
            } else $(this).val("");
        }
    })
};

createTimeBlocks();
displaySavedEvents();