// const coefficients = {
//     a: 1,
//     b: 2,
//     c: 5,
// };

function evaluate(x, c) {
    return c.a + c.b * x + c.c + Math.pow(x, 2);
}

const coefficients = {
    a: 1,
    c: 3,
}

console.log(
    evaluate(5, coefficients)
); // NaN

const betterCoefficients = new Proxy(coefficients, {
    get(target, key) {
        if (!/^[a-z]$/.test(key)) return target[key];
        return target[key] || 0;
    }
});

console.log(
    evaluate(5, betterCoefficients)
); // 29

console.log(
    betterCoefficients.b
); // 0
console.log(
    betterCoefficients.d
); // 0
console.log(
    betterCoefficients.anything
); // undefined