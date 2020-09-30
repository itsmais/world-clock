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
    "+08:00",
    '+03:00',
    '-04:00',
    "+10:00",
    "+02:00",
    "+02:00",
    '+09:00',
    '+02:00',
    "-04:00",
    '+01:00"',
    '+09:00'
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
        let localUTCTime = parsedResult["utc_datetime"];
        updateLocalRegion(localRegion);

        ////////////////////////////////////////////
        for (let i=0; i<12; i++){
            // utc time, utc offsets
            let temp = new Date (localUTCTime) + utc_offsets[i];
            updateTime(temp.toUTCString(),i);
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
function getTime (dataTimeString){
    return (dataTimeString.substring(11,19));
}