// let cities=[
//     'user city',
//     'Shanghai',
//     'Moscow',
//     'Toronto',
//     'Melbourne',
//     'Madrid',
//     'Berlin',
//     'Seoul',
//     'Brussels',
//     'New York',
//     'London',
//     'Tokyo'
// ]

let timeZoneLinks = [
    'https://worldtimeapi.org/api/timezone/asia/beirut', // link to time for specific IP
    'https://worldtimeapi.org/api/timezone/asia/shanghai',
    'https://worldtimeapi.org/api/timezone/europe/moscow',
    'https://worldtimeapi.org/api/timezone/america/toronto',
    'https://worldtimeapi.org/api/timezone/australia/melbourne',
    'https://worldtimeapi.org/api/timezone/europe/madrid',
    'https://worldtimeapi.org/api/timezone/europe/berlin',
    'https://worldtimeapi.org/api/timezone/asia/seoul',
    'https://worldtimeapi.org/api/timezone/europe/madrid',
    'https://worldtimeapi.org/api/timezone/america/new_york',
    'https://worldtimeapi.org/api/timezone/europe/london',
    'https://worldtimeapi.org/api/timezone/asia/tokyo'
];

let times = [];


function loadFile(url, timeout, callback) {
    var args = Array.prototype.slice.call(arguments, 3);
    var xhr = new XMLHttpRequest();
    xhr.ontimeout = function () {
        console.error("The request for " + url + " timed out.");
    };
    xhr.onload = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                callback.apply(xhr, args);
            } else {
                console.error(xhr.statusText);
            }
        }
    };
    xhr.open("GET", url, true);
    xhr.timeout = timeout;
    xhr.send(null);
}
let i = 0;

function showMessage(message) {
    console.log(this.responseText);
    times.push(JSON.parse(this.responseText)["datetime"].substring(11, 19));
    document.getElementById("c" + i).innerHTML += times[0];
    i++;
}

// loadFile("https://worldtimeapi.org/api/timezone/asia/tokyo", 2000, showMessage, "");

for (let j in timeZoneLinks) {
    loadFile(timeZoneLinks[j], 2000, showMessage, "");
}