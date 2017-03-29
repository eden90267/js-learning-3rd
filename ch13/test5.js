function sum(arr, f) {
    // 如果不提供函式，可使用一個"null函式"，
    // 它只會回傳未修改的引數
    if (typeof f != 'function') f = x => x;

    return arr.reduce((a, x) => a += f(x), 0);
}

sum([1, 2, 3]);                      // 6
sum([1, 2, 3], x => x * x);            // 14
sum([1, 2, 3], x => Math.pow(x, 3)); // 36


function newSummer(f) {
    return arr => sum(arr, f);
}

const sumOfSquares = newSummer(x => x * x);
const sumOfCubes = newSummer(x => Math.pow(x, 3));
sumOfSquares([1, 2, 3]); // 14
sumOfCubes([1, 2, 3]);   // 36