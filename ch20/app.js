const { geometricSum, quadraticFormula } = require('./amanda');
const sphereVolume = require('./tyler.js');

console.log(typeof geometricSum);

console.log(geometricSum(1,2,5));       // 31
console.log(quadraticFormula(1,2,-15)); // [ 3, -5 ]
console.log(sphereVolume(2));                  // 33.510321638291124