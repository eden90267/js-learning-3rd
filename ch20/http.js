const http = require('http');

const server = http.createServer(function(req, res){
    console.log(`${req.method} ${req.url}`);
    res.end('Hello world!');
});

const port = 8080;
server.listen(port, function() {
    // 可傳遞一個回呼來監聽
    // 可讓你知道伺服器已經啟動的東西
    console.log(`server started on port ${port}`);
})