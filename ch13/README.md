# 函式與抽象思考的威力

函式，就像變色龍：在不同的情境中，你對它們會有不同的看法。我們要看的第一個最簡單的觀點，就是重複使用程式的機制。

## 將函式當成副程式

subroutine，一種管理複雜問題的做法。副程式就是將一些重複的功能包起來，給它一個名稱，讓你隨時可藉由那個名稱來執行那些功能。

副程式經常用來包裝**演算法**，它只是一個執行特定工作的方法。

判斷目前日期所屬年份是否為閏年的演算法：

```
const year = new Date().getFullYear();
if (year % 4 !== 0) console.log(`${year} is NOT a leap year.`);
else if (year % 100 !== 0) console.log(`${year} is a leap year.`);
else if (year % 400 !== 0) console.log(`${year} is NOT a leap year.`);
else console.log(`${year} is a leap year.`);
```

建立一個可重複使用的副程式(函式)：

```
function printLeapYearStatus() {
    const year = new Date().getFullYear();
    if (year % 4 !== 0) console.log(`${year} is NOT a leap year.`);
    else if (year % 100 !== 0) console.log(`${year} is a leap year.`);
    else if (year % 400 !== 0) console.log(`${year} is NOT a leap year.`);
    else console.log(`${year} is a leap year.`);
}
```

## 將函式當成會回傳一個值的副程式

```
function isCurrentYearLeapYear() {
    const year = new Date().getFullYear();
    if (year % 4 !== 0) return false;
    else if (year % 100 !== 0) return true;
    else if (year % 400 !== 0) return false;
    else return true;
}

const daysInMonth = [31, isCurrentYearLeapYear() ? 29: 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
if (isCurrentYearLeapYear()) console.log('It is a leap year.');
```

## 將函式當成...函數

純函式。與函式有什麼不同？

- 相同的輸入組合只能產生相同的輸出。

    isCurrentYearLeapYear不是一種純函式，因為它會根據你呼叫它的時間回傳不同東西

- 不能有副作用。

    也就是說，呼叫函式後，程式的狀態不會被改變。
    
```
const colors = ['red', 'orange', 'yellow', 'green',
    'blue', 'indigo', 'violet'];
let colorIndex = -1;
function getNextRainbowColor() {
    if (++colorIndex >= colors.length) colorIndex = 0;
    return colors[colorIndex];
}
```

函式`getNextRainbowColor`破壞純函式兩條規則：

- 就算每次都輸入相同的值，它也會有不同的回傳值(它沒引數，所以沒輸入)。
- 有副作用(`colorIndex`變數會改變)。`colorIndex`變數不是函式的一部分，呼叫`getNextRainbowColor`會修改它，這是一種副作用。

如何將閏年韓式改成純函式？答案很簡單：

```
function isLeapYear(year) {
    if (year % 4 !== 0) return false;
    else if (year % 100 !== 0) return true;
    else if (year % 400 !== 0) return false;
    else return true;
}
```

對於相同的輸入只會回傳相同的輸出，它不會造成副作用，所以是純函式。

```
const getNextRainbowColor = (function () {
    const colors = ['red', 'orange', 'yellow', 'green',
        'blue', 'indigo', 'violet'];
    let colorIndex = -1;
    return function () {
        if (++colorIndex >= colors.length) colorIndex = 0;
        return colors[colorIndex];
    }
})();
```

我們有一個無副作用的函式了。但它不是純函式，因為相同的輸入不一定有相同的結果。要解這問題前，先小心地思考：我們如何使用這個函式。我們很可能重複呼叫它。

```
setInterval(function () {
    document.querySelector('.rainbow')
        .style['background-color'] = getNextRainbowColor();
}, 500);
```

目的明顯， HTML中類別為`rainbow`的元素會循環顯示彩虹的顏色。但有其他東西呼叫`getNextRainbowColor()`，它會干擾這斷程式！此時該思考的是，讓一個函式沒有副作用是不是好事。此案例使用迭代器或許比較好：

```
function getRainbowIterator() {
    const colors = ['red', 'orange', 'yellow', 'green',
        'blue', 'indigo', 'violet'];
    let colorIndex = -1;
    return {
        next() {
            if (++colorIndex >= colors.length) colorIndex = 0;
            return { value: colors[colorIndex], done: false };
        }
    }
}
```

現在`getRainbowIterator`是個純函式：他每次回傳同樣的東西(迭代器)，而且沒有副作用。我們必須採取不同的方式來使用它，但安全多了：

```
const rainbowIterator = getRainbowIterator();
setInterval(function () {
    document.querySelector('.rainbow')
        .style['background-color'] = rainbowIterator.next().value;
}, 500);
```

## 那又如何？

已看到三種函式面貌：

- 副程式
- 可回傳值的副程式
- 純函式

但，那又如何？區分他們的重要性在哪裡？

副程式用來實現DRY的基本概念(don't repeat youself)。

純函式：可讓你的程式**更容易測試**，**更容易理解**，且**更容易移植**。

如果函式會根據不同情況回傳不同值，或具有副作用，**它們都與它們所處的環境有緊密的關係**。特別是99%的正常，1%的bug。

所以，**你永遠都要優先使用純函式**。因為，寫出有副作用的函式很容易。不要求不要做，而是先暫停一下，思考有沒有可能找到寫出純函式的方式。

OOP提供的模式，可讓你限制副作用的範圍，在受限制且明智的情況下使用副作用。

### 將函式當成物件

JavaScript中，函式是Function物件的實例。值得一提的是，優先使用`typeof`來辨識函式與其他形態物件，因為用`f instanceof Object`會是`true`。

## IIFE與非同步程式

IIFE已經知道它們是一種建立`closure`的方式。現在來看一個重要的範例，來了解IIFE如何協助我們編寫非同步程式。

IIFE最重要的用途之一，就是在新的範圍建立新的變數，讓非同步程式碼可以正確執行。

考慮一個傳統範例，有個計時器會從5秒開始，到數到"go!"為止(0秒)。

```
var i;
for (i = 5; i >= 0; i--) {
    setTimeout(function () {
        console.log(i === 0 ? 'go!' : i);
    }, (5 - i) * 1000);
}
```

結果是印出6次-1。setTimeout的函式沒有被呼叫：它會在未來某個時候被呼叫。迴圈執行與i從5到-1，它們都會在函式被呼叫之前發生。所以當函式被呼叫時，i的值是-1。可[參考](http://www.jstips.co/zh_tw/javascript/implementing-asynchronous-loops/)。

使用let區塊等級的範圍，可以實質解決這個問題。

在區塊範圍的變數之前，解決這個問題的方式，是使用其他的函式。**使用其他的函式來建立一個新範圍，這樣就可在每一個步驟捕捉i的值**(在closure裡面)。

```
function loopBody(i) {
    setTimeout(function () {
        console.log(i === 0 ? 'go!' : i);
    }, (5 - i) * 1000);
}
var i;
for (i=5;i>=0;i--) {
    loopBody(i);
}
```

在每個步驟中，被傳入的函式不是變數i，而是i的**值**。其實我們建立了六個不同的範圍與六個獨立的變數(外部範圍一個，每次呼叫loopBody時各一個)。

但幫迴圈建立一個只會用一次的具名函式是很無聊的做法。採用IIFE：

```
var i;
for (i = 5; i >= 0; i--) {
    (function (i) {
        setTimeout(function () {
            console.log(i === 0 ? 'go!' : i);
        }, (5 - i) * 1000);
    })(i);
}
```

區塊範圍的變數可大幅簡化解決這個問題：

```
for (let i = 5; i >= 0; i--) {
    setTimeout(function () {
        console.log(i === 0 ? 'go!' : i);
    }, (5 - i) * 1000);
}
```

使用let關鍵字可提醒JavaScript，在迴圈的每一個步驟，會有一個新的、獨立的i變數版本。所以當被傳到setTimeout的函式在未來被執行時，他們接收自己範圍裡面的變數的值。

## 函式變數

數字、字串、陣列或物件想成變數，認為變數是一種資料。但函式是主動的，不能將它想成一種資料(資料是被動)。當函式**被呼叫**，它的確是主動的。而它被呼叫之前，就如同其他變數一樣，是被動的。

一個比喻：水果與攪拌器，攪拌器就像函式，插上電就能做些事情(把水果變冰沙)，而除此之外，就像水果一樣要過輸送帶、付錢、放購物袋、帶回家等等。唯有插上電、放水果進去、打開開關，才會變成與水果不一樣的東西。

可以使用變數的地方，就可使用函式。可作以下事情：

- 為函式起個別名，做法是建立一個變數來指向它
- 將函式放入陣列(可能與其他形態的資料混在一起)
- 將函式當成物件的特性來使用
- 將函式傳入函式
- 從函式回傳函式
- 從函式回傳一個函式，這函式本身接收一個函式引數

可謂較長名稱的函式取一個別名。函式只是另一種資料型態。

```
function addThreeSquareAddFiveTakeSquareRoot(x) {
  ...
}
const f = addThreeSquareAddFiveTakeSquareRoot;
const answer = (f(5) + f(2)) / f(7);
```

你不會經常看到這個案例。但，它經常在設定命名空間中按到，這動作經常在Node開發發生。

```
const Money = require('math-money'); // require是一種Node函式，目的是匯入程式庫

const oneDollar = Money.Dollar(1);
const Dollar = Money.Dollar;
const twoDollar = Dollar(2);
// oneDollar與twoDollar都是同一種型態的實例
```

將Money.Dollar更名為Dollar，看起來較合理。

### 陣列中的函式

