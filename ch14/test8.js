const EventEmitter = require('events').EventEmitter;

class Countdown extends EventEmitter {
    constructor(seconds, superstitious) {
        super();
        this.seconds = seconds;
        this.superstitious = !!superstitious;
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

// const c = new Countdown(5);
// superstitious: 迷信
const c = new Countdown(15, true)
    .on('tick', function (i) {
        if (i > 0) console.log(i + '...');
    });

c.go()
    .then(function () {
        console.log('GO!');
    })
    .catch(function (err) {
        console.error(err.message);
    });