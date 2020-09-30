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
let utc_offsets=[
    'user city',
    8,
    3,
    -4,
    +10,
    +2,
    +2,
    +9,
    +2,
    -4,
    +1,
    +9
]
let timeZoneLink = 'https://worldtimeapi.org/api/ip';
    // https://worldtimeapi.org/api/timezone/asia/shanghai
    // https://worldtimeapi.org/api/timezone/europe/moscow
    // https://worldtimeapi.org/api/timezone/america/toronto
    // https://worldtimeapi.org/api/timezone/australia/melbourne
    // https://worldtimeapi.org/api/timezone/europe/madrid
    // https://worldtimeapi.org/api/timezone/europe/berlin
    // https://worldtimeapi.org/api/timezone/asia/seoul
    // https://worldtimeapi.org/api/timezone/europe/madrid
    // https://worldtimeapi.org/api/timezone/america/new_york
    // https://worldtimeapi.org/api/timezone/europe/london
    // https://worldtimeapi.org/api/timezone/asia/tokyo

let times = [];

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("https://worldtimeapi.org/api/ip", requestOptions)
    .then(response => response.text())
    .then(result => {
        let parsedResult = JSON.parse(result);
        let indOfSlash = parsedResult["timezone"].indexOf('/')+1;
        let localRegion = parsedResult["timezone"].substring(indOfSlash);
        updateLocalRegion(localRegion);
        // let localUTCOffset = parsedResult["utc_offset"];
        document.getElementById("c0").innerHTML+="<br>"+ getTime(parsedResult["datetime"]);
        
        let localUTCTime = new Date (parsedResult["utc_datetime"]);
        ////////////////////////////////////////////
        for (let i=1; i<12; i++){
            // utc time, utc offsets
            let tzDifference = utc_offsets[i] * 60 + localUTCTime.getTimezoneOffset();
            let currentDate = new Date(localUTCTime.getTime() + tzDifference * 60 * 1000);
            times[i] = currentDate;
            currentDate.getTime();

            var date = currentDate.getDate();
            var hr = currentDate.getHours();
            var min = currentDate.getMinutes();
            // var month = months[currentDate.getMonth()];
            // var year = currentDate.getFullYear();
            // x.innerHTML = day + " " + hr + ":" + min + ampm + " " + date + " " + month + " " + year;
            document.getElementById("c"+i).innerHTML+= "<br>"+ hr + ":" + min ;

        }
       

        ////////////////////////////////////////////

        
    })
    .catch(error => console.log('error', error));


function updateLocalRegion(region){
    document.getElementById("c0").innerHTML=region;
}
function updateTime(time, country_index){
    document.getElementById("c"+country_index).innerHTML+=time;
}
function getTime (dateTimeString){
    return (dateTimeString.substring(11,19));
}