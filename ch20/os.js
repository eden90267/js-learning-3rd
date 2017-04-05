const os = require('os');

console.log("Hostname: " + os.hostname());                                // Eden-MBP
console.log("OS type: " + os.type());                                     // Darwin
console.log("OS platform: " + os.platform());                             // darwin
console.log("OS release: " + os.release());                               // 16.5.0
console.log('OS uptime: ' + (os.uptime()/60/60/24).toFixed(1) + " days"); // 0.0 days
console.log('CPU architecture: ' + os.arch());                            // x64
console.log('Number of CPUs: ' + os.cpus().length);                       // 8
console.log('Total memory: ' + (os.totalmem()/1e6).toFixed(1) + ' MB');   // 8589.9 MB
console.log('Free memory: ' + (os.freemem()/1e6).toFixed(1) + ' MB');     // 1055.8 MB