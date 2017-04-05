const fs = require('fs');

fs.readdir(__dirname, function(err, files) {
    if (err) return console.error('Unable to read directory contents');
    console.log(`Contents of ${__dirname}:`);
    console.log(files.map(f => '\t' + f).join('\n'));
});

// Contents of C:\Users\eden_liu\js-learning-3rd\ch20:
//         amanda.js
//         app.js
//         debug.js
//         debug_test.js
//         hello.txt
//         ls.js
//         read.js
//         README.md
//         tyler.js
//         write.js