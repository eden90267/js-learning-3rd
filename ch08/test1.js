// 陣列常值
const arr1 = [1, 2 ,3];
const arr2 = ["one", 2, "three"];
const arr3 = [[1 ,2, 3], ["one", 2, "three"]];
const arr4 = [
  {name: "Fred", type: "object", luckyNumbers: [5, 7, 13]},
  [
    {name: "Susan", type: "object"},
    {name: "Anthony", type: "object"}
  ],
  1,
  function() {return "arrays can contain functions too";},
  "three",
];

// 存取元素
arr1[0];
arr1[2];
arr3[1];
arr4[1][0];

// 陣列長度
arr1.length;
arr4.length;
arr4[1].length;

// 增加陣列大小
arr1[4] = 5;
arr1;
arr1.length;

// 存取(不是指派)比陣列大的索引，"不會"改變陣列大小
arr2[10];
arr2.length;

// Array建構式(很少用)
const arr5 = new Array();        // 空陣列
const arr6 = new Array(1, 2, 3); // [1, 2, 3]
const arr7 = new Array(2);       // 長度為2的陣列(all元素都是undefined)
const arr8 = new Array("2");     // ["2"]


class Person {
    constructor(name) {
        this.name = name;
        this.id = Person.nextId++;
    }
}

Person.nextId = 0;
const jamie = new Person("Jamie"),
    juliet = new Person("Juliet"),
    peter = new Person("Peter"),
    jay = new Person("Jay");
const arr = [jamie, juliet, peter, jay];

console.log(arr.find(p => p.id === juliet.id));

console.log(arr.find(function(p) {
    return p.id === this.id;
}, juliet));


const cart = [{ name: "Widget", price: 9.95 }, { name: "Gadget", price: 22.95 }];
const names = cart.map(x => x.name); // ["Widget", "Gadget"]
const prices = cart.map(x => x.price); // [9.95, 22.95]
const discountPrices = prices.map(x => x * 0.8); // [7.96, 18.36]
const lcNames = names.map(String.toLowerCase); // ["widget", "gadget"];

const items = ["Widget", "Gadget"];
const prices = [9.95, 22.95];
const cart = items.map((x, i) => { name: x, price: prices[i] });


const cards = [];
for (let suit of['H', 'C', 'D', 'S'])
    for (let value = 1; value <= 13; value++)
        cards.push({ suit, value });

// 取得所有數字2的牌
cards.filter(c => c.value === 2);

// 取得所有鑽石
cards.filter(c => c.suit === 'D');

// 取得所有臉牌
cards.filter(c => c.value > 10);

// 取得所有紅心臉牌
cards.filter(c => c.suit === 'H' && c.value > 10);


function cardToString(c) {
    const suits = { 'H': '\u2665', 'C': '\u2663', 'D': '\u2666', 'S': '\u2660' };
    const values = { 1: 'A', 11: 'J', 12: 'Q', 13: 'K' };
    for (let i = 2; i <= 10) values[i] = i;
    return values[c.value] + suits[c.suit];
}

// 取得所有數字2的牌
cards.filter(c => c.value === 2).map(c => cardToString(c));

// 取得所有紅心臉牌
cards.filter(c => c.suit === 'H' && c.value > 10).map(cardToString);


const words = ["Beachball", "Rodeo", "Angel",
    "Aardvark", "Xylophone", "November", "Chocolate",
    "Papaya", "Uniform", "Joker", "Clover", "Bali"
];
const alphabetical = words.reduce((a, x) => {
	if (!a[x[0]]) a[x[0]] = [];
	a[x[0]].push(x);
	return a;
}, {});




const data = [3.3, 5, 7.2, 12, 4, 6, 10.3];
const stats = data.reduce((a, x) => {
	a.N++;
	let delta = x - a.mean;
	a.mean += delta/a.N;
	a.M2 += delta*(x - a.mean);
    return a;
}, {N:0, mean: 0, M2: 0});
if (stats.N > 2) {
	stats.variance = stats.M2 / (stats.N -1);
	stats.stdev = Math.sqrt(stats.variance);
}
