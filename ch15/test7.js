const moment = require('moment-timezone');

moment().subtract(10, 'seconds').fromNow();  // a few seconds ago
moment().subtract(44, 'seconds').fromNow();  // a few seconds ago
moment().subtract(45, 'seconds').fromNow();  // a minute ago
moment().subtract(5, 'minutes').fromNow();   // 5 minutes ago
moment().subtract(44, 'minutes').fromNow();  // 44 minutes ago
moment().subtract(45, 'minutes').fromNow();  // an hour ago
moment().subtract(5, 'hours').fromNow();     // 5 hours ago
moment().subtract(21, 'hours').fromNow();    // 21 hours ago
moment().subtract(22, 'hours').fromNow();    // a day ago
moment().subtract(319, 'days').fromNow();    // 10 months ago
moment().subtract(320, 'days').fromNow();    // a year ago

console.log(

moment().subtract(319, 'days').fromNow()


);