console.log("Before timeout: " + new Date());
function f() {
    console.log("After timeout: " + new Date());
}
setTimeout(f, 60*1000); // 一分鐘
console.log("I happen after setTimeout!");
console.log("Me too!");