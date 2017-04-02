const moment = require('moment-timezone');

// America/Los_Angeles: -07:00
const d = moment.tz([2016, 3, 27, 9, 19], "America/Los_Angeles").toDate();
console.log(d); // 2016-04-27T16:19:00.000Z (.toDate()：+07:00回UTC的時間)