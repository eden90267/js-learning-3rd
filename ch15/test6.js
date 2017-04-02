const moment = require('moment-timezone');

let m = moment();      // moment("2017-04-02T13:27:16.956")
m.add(3, 'days');      // moment("2017-04-05T13:27:16.956")
m.subtract(2, 'years'); // moment("2015-04-05T13:27:16.956")

m = moment();           // 重置
m.startOf('year');      // moment("2017-01-01T00:00:00.000")
m.endOf('month');       // moment("2017-01-31T23:59:59.999")