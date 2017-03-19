// 協助函式
// 隨機回傳範圍[m, n](包括頭尾)之間的整數
function rand(m, n) {
    return m + Math.floor((n - m + 1) * Math.random());
}

// 隨機回傳一個代表
// 六個Crown and anchor圖案的字串
function randFace() {
    return ['crown', 'anchor', 'heart', 'spade', 'club', 'diamond'][rand(0, 5)];
}




let funds = 50; // 起始條件
let round = 0; // 計算下注的次數

while (funds > 1 && funds < 100) {
    round++;
    console.log(`round ${round}`);
    console.log(`\tstarting funds: ${funds}p`);
    // 下注
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
        let remaining = totalBet;
        do {
            let bet = rand(1, remaining);
            let face = randFace();
            bets[face] = bets[face] + bet;
            remaining = remaining - bet;
        } while (remaining > 0);
    }
    funds = funds - totalBet;
    console.log('\tbets:' +
        Object.keys(bets).map(face => `${face}: ${bets[face]} pence`).join(', ') +
        ` (total: ${totalBet} pence)`
    );

    // 擲骰子
    const hand = [];
    for (let roll = 0; roll < 3; roll++) {
        hand.push(randFace());
    }
    console.log(`\thand: ${hand.join(', ')}`);

    // 拿贏得的錢
    let winnings = 0;
    for (let die = 0; die < hand.length; die++) {
        let face = hand[die];
        if (bets[face] > 0) winnings = winnings + bets[face];
    }
    funds = funds + winnings;
    console.log(`\twinnings: ${winnings}`);
}
console.log(`\tending funds: ${funds}`);
