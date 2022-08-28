

function Clock() {
    var liveClock = new Date();

    var hours = liveClock.getHours();
    var minutes = liveClock.getMinutes();
    var seconds = liveClock.getSeconds();


    //
    var amPm = (hours < 12) ? "AM" : "PM";
    hours = (hours > 12 ) ? hours - 12 : hours;

    hours = ("0" + hours).slice(-2);
    minutes = ("0" + minutes).slice(-2);
    seconds = ("0" + seconds).slice(-2);

    document.getElementById('liveClock').innerHTML = 
        hours + " : " + minutes + " : " + seconds + " " + amPm;
    updateTime();
    var t = setTimeout(Clock, 500);
}



function addClock() {
    var newDiv = document.createElement("div");
    var newOutput = document.createElement("output");
    var newSpan = document.createElement("p");

    
    const tz = document.getElementById("timezones");

    var zone = tz.options[tz.selectedIndex].value;
    var zoneText = tz.options[tz.selectedIndex].text;
    newSpan.innerHTML = zoneText;
    newDiv.appendChild(newSpan);
    newDiv.setAttribute("timezone", zone)
    newDiv.classList.add("clock-card");

    const time = luxon.DateTime.now().setZone(zone);
    newOutput.innerHTML =  time.toFormat("tt");
    newDiv.appendChild(newOutput);
    var clocksDiv = document.querySelector("div.clocks-container");
    clocksDiv.appendChild(newDiv);

    newDiv.addEventListener("click", function() {
        newDiv.remove()
    })
}



function updateTime() {
    const clocks = document.querySelectorAll("div.clock-card")
    clocks.forEach(clock => {
        const output = clock.querySelector("output");
        var zone = clock.getAttribute("timezone");
        const time = luxon.DateTime.now().setZone(zone)
        output.innerHTML = time.toFormat("tt");
    })
}