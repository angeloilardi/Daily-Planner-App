// display current day on the page
let currentDay = moment().format("dddd, MMMM Do YYYY");
$("#currentDay").text(currentDay);
console.log(currentDay);



let startTime = moment('7am', 'hA');
console.log(startTime);

let finishTime =  moment('7pm', 'hA')

// add one row for each time block
let i = startTime;

while (moment(i).isSameOrBefore(finishTime)){
    console.log('added time');
    let timeBlock = $("<div>").addClass("row");
    let timeDisplay = $("<div>")
    .addClass("col-2 col-s-3 hour")
    .text(moment(i).format("hA"));
    let eventDetails = $("<textarea>")
    .addClass("col-8");
    let saveBtn = $("<button>")
    .addClass("col-2 saveBtn");
    let saveicon = $("<i></i>").addClass("fa-regular fa-floppy-disk");
    saveBtn.append(saveicon);
    $(".container").append(timeBlock);
    timeBlock.append(timeDisplay, eventDetails,saveBtn);
    i = moment(i).add(1, 'h');
}

// function that checks if the if each timr block is in the past, present or future and giveds a different background accordingly
$(".hour").each(function(){
    if (moment($(this).text(), "hA").isBefore(moment(), "hour")){
        $(this).siblings().addClass("past");
    } else if (moment($(this).text(), "hA").isAfter(moment(), "hour")){
        $(this).siblings("textarea").addClass("future");
    } else  $(this).siblings().addClass("present");  
});

// function that saves events in the local storage

//add event listener to the save buttons

$(".saveBtn").on("click", function(){
    let savedDay = moment().format("DD MM YY");
    console.log(savedDay);
    let savedHour = $(this).siblings(".hour").text();
    console.log(savedHour);
    savedEvent = $(this).siblings("textarea").val();
    console.log(savedEvent);
})

// console.log(moment(currentDay + $(".hour").text(), "DD MM YY hA").format("DD MM YY hA"));

let savedDay = moment().format("DD MM YY");
console.log(savedDay);
let savedHour = $(".saveBtn").siblings(".hour").text();
console.log(savedHour);
savedEvent = $(".saveBtn").siblings("textarea").val();