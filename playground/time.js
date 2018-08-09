const moment = require('moment');

// var now = moment().add('30', 'm').format('h m');
// console.log(now);
// var now = moment();
// var timeArray = [];
// now.hours(6).minutes(0).seconds(0);
//
//
// var startTime = 6;
// var EndTime = 12;
//
// for(var i = 0; i < EndTime; i++) {
//   var firstPart = now.format('hh:mm A');
//   now.add(30, 'm');
//   var SecondPart = now.format('hh:mm A')
//   var string = `${firstPart} - ${SecondPart}`;
//   timeArray.push(string);
// }
// console.log(timeArray);

var time = moment();
var morningTimeArray = [];
var eveningTimeArray = [];
var nightTimeArray = [];

time.hours(6).minutes(0).seconds(0);

for(var i = 0; i< 18; i++) {
    var firstPart = time.format('hh:mm A');
    time.add(60, 'm');
    var SecondPart = time.format('hh:mm A')
    var string = `${firstPart} - ${SecondPart}`;
    if(i < 6) {
      morningTimeArray.push(string);
    } else if (i >= 6 && i < 12 ) {
      eveningTimeArray.push(string);
    } else {
      nightTimeArray.push(string);
    }
}

module.exports = {morningTimeArray, eveningTimeArray, nightTimeArray};
