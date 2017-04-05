const exec = require('child_process').exec;

exec('ls', function(err, stdout, stderr) {
    if (err) return console.error('Error executing "ls"');
    stdout = stdout.toString(); // 將Buffer轉成字串
    console.log(stdout);
    stderr = stderr.toString();
    if (stderr !== '') {
        console.error('error:');
        console.error(stderr);
    }
});