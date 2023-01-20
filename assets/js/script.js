// display current day on the page
let currentDay = moment().format("dddd, MMMM Do YYYY");
$("#currentDay").text(currentDay);
console.log(currentDay);

// add one row for each time block

let startTime = moment('9am', 'hA')//.format('hA');
console.log(startTime);

let finishTime =  moment('5pm', 'hA')//.format('hA');
console.log(finishTime);
console.log(moment(startTime).add(1, 'hours').format("hA"))

// for (let i = startTime; i <= finishTime; i+= moment(startTime, "ha").add(1, 'hours').format("hA")))
console.log(moment(startTime).isBefore(finishTime));
;

i = startTime;

while (moment(i).isSameOrBefore(finishTime)){
    console.log('added time');
    let timeBlock = $("<div>").addClass("row");
    $(".container").append(timeBlock)

    i = moment(i).add(1, 'hours')
}

