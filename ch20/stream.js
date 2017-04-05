const fs = require('fs');
const ws = fs.createWriteStream('stream.txt', {encoding: 'utf8'});
ws.write('line 1\n');
ws.write('line 2\n');
ws.end();             // 可選擇接收一個資料引數，它相當於呼叫write。
                      // 如果只傳送一次資料，可直接呼叫end，並使用你想傳送的資料。


const rs = fs.createReadStream('stream.txt', {encoding: 'utf8'});
rs.on('data', function(data) {
    console.log('>> data: ' + data.replace('\n', '\\n'));
});
rs.on('end', function(data) {
    console.log('>> end');
})