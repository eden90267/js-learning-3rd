const moment = require('moment-timezone');

const d = new Date(Date.UTC(1930, 4, 10));

// 以下是顯示給 Taipei 的人看的輸出

d.toLocaleDateString();  // '5/10/1930'
// d.toLocaleFormat();      // error，沒有這個方法
d.toLocaleTimeString();  // '8:00:00 AM'
d.toUTCString();         // 'Sat, 10 May 1930 00:00:00 GMT'

moment(d).format('YYYY-MM-DD');               // "1930-05-10"
moment(d).format("YYYY-MM-DD HH:mm");         // "1930-05-10 08:00"
moment(d).format("YYYY-MM-DD HH:mm Z");       // "1930-05-10 08:00 +08:00"
moment(d).format("YYYY-MM-DD HH:mm [UTC]Z");  // "1930-05-10 08:00 UTC+08:00"

moment(d).format("dddd, MMMM [the] Do, YYYY");// "Saturday, May the 10th, 1930"

moment(d).format("h:mm a");                   // "8:00 am"

console.log(
    
moment(d).format("h:mm a")

);