// const colors = ['red', 'orange', 'yellow', 'green',
//     'blue', 'indigo', 'violet'];
// let colorIndex = -1;
// function getNextRainbowColor() {
//     if (++colorIndex >= colors.length) colorIndex = 0;
//     return colors[colorIndex];
// }

const getNextRainbowColor = (function () {
    const colors = ['red', 'orange', 'yellow', 'green',
        'blue', 'indigo', 'violet'];
    let colorIndex = -1;
    return function () {
        if (++colorIndex >= colors.length) colorIndex = 0;
        return colors[colorIndex];
    }
})();

setInterval(function () {
    document.querySelector('.rainbow')
        .style['background-color'] = getNextRainbowColor();
}, 500);

// 但getNextRainbowColor若被其他東西呼叫，這會被干擾回傳值。
// 而且回傳值會不同，違背純函數的規則


function getRainbowIterator() {
    const colors = ['red', 'orange', 'yellow', 'green',
        'blue', 'indigo', 'violet'];
    let colorIndex = -1;
    return {
        next() { // 需要重複一個陣列循環回傳值，所以要自己寫迭代器(不會產生value: undefined, done: true)
            if (++colorIndex >= colors.length) colorIndex = 0;
            return { value: colors[colorIndex], done: false };
        }
    }
}

const rainbowIterator = getRainbowIterator();
setInterval(function () {
    document.querySelector('.rainbow')
        .style['background-color'] = rainbowIterator.next().value;
}, 500);

// getRainbowIterator回傳值相同(iterator)，且也沒副作用，也不會跟其他東西呼叫衝突了