const fs = require('fs');

// 1. 將Node錯誤優先回呼轉成promise
function nfcall(f, ...args) {
    return new Promise(function (resolve, reject) {
        f.call(null, ...args, function (err, ...args) {
            if (err) return reject(err);
            resolve(args.length < 2 ? args[0] : args)
        });
    });
}

// 2. 需要一個setTimeout，它會接收一個回呼
function ptimeout(delay) {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, delay);
    });
}

// 3. 遞迴產生器執行器
function grun(g) {
    const it = g();
    (function iterate(val) {
        const x = it.next(val);
        if (!x.done) {
            if (x.value instanceof Promise) {
                x.value.then(iterate).catch(err => it.throw(err));
            } else {
                setTimeout(iterate, 0, x.value);
            }
        }
    })();
}

// function* theFutureIsNow() {
//     const dataA = yield nfcall(fs.readFile, 'a.txt');
//     const dataB = yield nfcall(fs.readFile, 'b.txt');
//     const dataC = yield nfcall(fs.readFile, 'c.txt');
//     yield ptimeout(60*1000);
//     yield nfcall(fs.writeFile, 'd.txt', dataA + dataB + dataC);
// }

// function* theFutureIsNow() {
//     const data = yield Promise.all([
//         nfcall(fs.readFile, 'a.txt'),
//         nfcall(fs.readFile, 'b.txt'),
//         nfcall(fs.readFile, 'c.txt'),
//     ]);
//     yield ptimeout(60*1000);
//     yield nfcall(fs.writeFile, 'd.txt', data[0] + data[1] + data[2]);
// }

function* theFutureIsNow() {
    let data;
    try {
        data = yield Promise.all([
            nfcall(fs.readFile, 'a.txt'),
            nfcall(fs.readFile, 'b.txt'),
            nfcall(fs.readFile, 'c.txt'),
        ]);
    } catch (err) {
        console.log("unable to read one or more input files: " + err.message);
        throw err;
    }
    yield ptimeout(60 * 1000);
    try {
        yield nfcall(fs.writeFile, 'd.txt', data[0] + data[1] + data[2]);
    } catch (err) {
        console.log("unable to write output file: " + err.message);
        throw err;
    }
}

grun(theFutureIsNow);