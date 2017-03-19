# 控制流程

## while 迴圈

```
let funds = 50;

while(funds > 1 && funds < 100) {
	// 下注

	// 擲骰子

	// 拿贏得的錢
}
```

## 區塊陳述式

```
{
    // 開始區塊陳述式
    console.log("statement 1");
    console.log("statement 2");
}   // 結束區塊陳述式
console.log("statement 3");
```

## if...else 陳述式

```
const bets = {
    crown: 0,
    anchor: 0,
    heart: 0,
    spade: 0,
    club: 0,
    diamond: 0
};

let totalBet = rand(1, funds);
if (totalBet === 7) {
	totalBet = funds;
	bets.heart = totalBet;
} else {
    // 分發所有賭注
}
funds = funds - totalBet;
```

## do...while 迴圈

```
let remaining = totalBet;
do {
	let bet = rand(1, remaining);
	let face = randFace();
	bets[face] = bets[face] + bet;
	remaining = remaining - bet;
} while(remaining > 0)
```

## for 迴圈

```
const hand = [];
for (let roll = 0; roll < 3; roll++) {
	hand.push(randFace());
}
```

## if 陳述式

```
let winnings = 0;
for (let die = 0; die < hand.length; die++) {
	let face = hand[die];
	if (bets[face] > 0) winnings = winnings + bets[face];
}
funds = funds + winnings;
```

## JavaScript的控制流程陳述式

控制流程分兩個類別：

- 條件型(or 分支型)

    - `if`
    - `if...else`
    - `switch`

- 迴圈型

    - `while`
    - `do...while`
    - `for`

###  流程控制例外

四種陳述式會改變控制流程的正常程序，可視為控制流程的“王牌”：

- `break`
- `continue`
- `return`
- `throw`

### 串連if...else陳述式

```
if (new Date().getDay() === 3) {
    totalBet = 1;
} else if (funds === 7) {
    totalBet = funds;
} else {
    console.log("No superstition here!");
}
```

## 其他的for迴圈模式

```
for (let temp, i=0, j=1; j < 30; temp = i, i = j, j = i + temp)
    console.log(j);

// 1. temp = undefined, i = 0,  j = 1 // 先以初始值執行statement一次
// 2. temp = 0,         i = 1,  j = 1
// 3. temp = 1,         i = 1,  j = 2
// 4. temp = 1,         i = 2,  j = 3
// 5. temp = 2,         i = 3,  j = 5
// 6. temp = 3,         i = 5,  j = 8
// 7. temp = 5,         i = 8,  j = 13
// 8. temp = 8;         i = 13, j = 21
```

不一定是遞增或遞減，任何運算式都可以動作：

```
let s = '3';
for (; s.length < 10; s = ' ' + s); // 加入一個分號來結束這個for迴圈

for (let x = 0.2; x < 3.0; x += 0.2)
    console.log(x);
    
for (; !player.isBroke;)            // 使用物件特性來當條件
    console.log('Still playing');
```

for迴圈一定可以改寫成while迴圈。

### switch 陳述式

```
switch (totalBet) {
    case 7:
        totoalBet = funds;
        break;
    case 11: // 掉落執行(fall through execution)，容易被認為壞掉程式碼，最好標注解
    case 13:
        totalBet = 0;
        break;
    case 21:
        totalBet = 21
        break;
    default:
        console.log("No superstition here!");
        break; // 非必要，但加上是好習慣
}
```

### for...in 迴圈

是為了循環執行物件的特性鍵

```
const player = { name: 'Thomas', rank: 'Midshipman', age: 25 };
for (let prop in player) {
    if (!player.hasOwnProperty(prop)) continue;
    console.log(prop + ': ' + player[prop]);
}
```

不一定要呼叫`player.hasOwnProperty`，但省略它通常會造成錯誤。

### for...of 迴圈

ES6新增的，它提供另一種方式來循環執行集合內的元素。

`for...of`迴圈可以與陣列一起使用，但一般來說，他可以與任何**可迭代**的物件一起使用。

```
const hand = [randFace(), randFace(), randFace()];
for (let face of hand)
    console.log(`You rolled...${face}!`);
```

如果需要知道索引，可使用一般的for迴圈。

## 實用的控制流程模式

### 使用continue來減少條件嵌套

```
while(funds > 1 && funds < 100) {
    let totalBet = rand(1, funds);
    if (totalBet === 13) {
        console.log("Unlucky! Skip this round....");
        continue;
    }
    // 下注...
}
```

### 使用break或return來避免沒必要的計算

迴圈用來找某一個目標，找到後就停止，那麼當找到目標，就沒必要執行接下來的每一步驟。

```
let firstPrime = null;
for (let n of bigArrayOfNumbers) {
	if (isPrime(n)) {
		firstPrime = n;
		break;
	}
}
```

如果迴圈在函式裡，可以使用return陳述式來取代break

### 迴圈結束後使用索引值

```
let i = 0;
for (;i < bigArrayOfNumbers.length; i++) {
    if (isPrime(bigArrayOfNumbers[i])) break;
}
if (i === bigArrayOfNumbers.length) console.log('No prime numbers!');
else console.log(`First prime number found at position ${i}`);
```

### 在修改串列時，使用降冪索引

```
for (let i = bigArrayOfNumbers.length - 1; i >= 0; i--) {
    if (isPrime(bigArrayOfNumbers[i])) bigArrayOfNumbers.splice(i, 1);
}
```
