const EventEmitter = require('events').EventEmitter;

class Countdown extends EventEmitter {
    constructor(seconds, superstitious) {
        super();
        this.seconds = seconds;
        this.superstitious = !!superstitious; // superstitious: 迷信
    }
    go() {
        const countdown = this;
        const timeoutIds = [];
        return new Promise(function (resolve, reject) {
            for (let i = countdown.seconds; i >= 0; i--) {
                timeoutIds.push(setTimeout(function () {
                    if (countdown.superstitious && i === 13) {
                        timeoutIds.forEach(clearTimeout); // 清除所有擱置的逾時
                        return reject(new Error("DEFINITELY NOT COUNTING THAT"));
                    }
                    countdown.emit('tick', i);
                    if (i === 0) resolve();
                }, (countdown.seconds - i) * 1000));
            }
        });
    }
}

function launch() {
    return new Promise(function (resolve, reject) {
        console.log('Lift off!');
        setTimeout(function () {
            resolve('In orbit');
        }, 2 * 1000); // 好快的火箭
    });
}

const c = new Countdown(5)
// const c = new Countdown(15, true)
    .on('tick', function (i) {
        if (i > 0) console.log(i + '...');
    });

c.go()
    .then(launch)
    .then(function () {
        console.log('GO!');
    })
    .catch(function (err) {
        console.error(err.message);
    });