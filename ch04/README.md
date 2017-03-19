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