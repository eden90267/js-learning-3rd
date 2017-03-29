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

不常用，但它的用法是漸進式的。其中一個用法是**管道**(pipeline)的概念，也就是一組被頻繁使用的獨立步驟。好處是可以隨時修改陣列，取出一個步驟或加入一個步驟。

一種範例是圖形變換。建構某種視覺化的軟體，會有個變換"管道"。以下是2D變換範例：

```
const sin = Math.sin;
const cos = Math.cos;
const theta = Math.PI / 4;
const zoom = 2;
const offset = [1, -3];

const pipeline = [
    function rotate(p) {
        return {
            x: p.x * cos(theta) - p.y * sin(theta),
            y: p.x * sin(theta) + p.y * cos(theta),
        };
    },
    function scale(p) {
        return { x: p.x * zoom, y: p.y * zoom };
    },
    function translate(p) {
        return { x: p.x + offset[0], y: p.y + offset[1] };
    }
];

// 現在pipeline是特定的2D變形的函式陣列
// 現在可以變換一點

const p = { x: 1, y: 1 };
let p2 = p;
for (let i = 0; i < pipeline.length; i++) {
    p2 = pipeline[i](p2);
}

// 現在p2是p1繞著原點旋轉45度(pi/4弧度)，放大兩倍，並往右移1個單位，往下移3個單位
```

管道處理經常用在圖形應用程式、音訊處理以及許多科學與工程應用程式中。現實生活中，只要你有一系列的函式需要按照特定順序來執行，那管道就是很實用的抽象功能。

### 將函式傳入函式

函式傳入函式案例：`setTimeout`與`forEach`。將函式傳入函式另一原因，是為了管理非同步程式，這是一種越來越受歡迎的做法。要做非同步執行，常見的方式是將一個函式(callback)傳入另一個函式。當包覆回呼函式的函式完成他的工作後，回呼函式才會被呼叫。

函式傳入函式不僅只限回呼，它也是一種很棒的"注入"功能的作法。

1. 將陣列中所有數字加總
2. 回傳平方的總和
3. 三次方的總和

傳遞函式就派上用場了：

```
function sum(arr, f) {
    // 如果不提供函式，可使用一個"null函式"，
    // 它只會回傳未修改的引數
    if (typeof f != 'function') f = x => x;

    return arr.reduce((a, x) => a+= f(x), 0);
}

sum([1, 2, 3]);                      // 6
sum([1, 2, 3], x => x*x);            // 14
sum([1, 2, 3], x => Math.pow(x, 3)); // 36
```

### 從函式回傳函式

函式回傳函式這或許是最深奧的函式用法。但它非常好用。函式回傳函式可以想成3D印表機：它是一種可以做出某種東西(例如函式)的東西，做出來的東西也可以做出某種東西。最令人興奮的是，你可以訂製要取回來的函式。就像訂製3D印表機印出的東西一樣。

考慮之前的sum，它會接收一個選用的函式來操作每一個元素，再加總它。這樣寫法並不夠好，顯然需要一個**只能**接收陣列並回傳平方和的函式(一個API可讓你提供一個sum的函式，只接受一個引數的函式)。

現在將它改寫成可不斷重複使用獨立函式這個模式：

```
function newSummer(f) {
    return arr => sum(arr, f);
}
```

這個newSummer會建立一個全新的sum函式。它只有一個引數，但使用自訂的函式。以下為用它取得不同種類的累加器：

```
const sumOfSquares = newSummer(x => x * x);
const sumOfCubes = newSummer(x => Math.pow(x, 3));
sumOfSquares([1, 2, 3]); // 14
sumOfCubes([1, 2, 3]);   // 36
```

※ 這門技術(將多引數函式轉換成只有一個引數的函式)稱為currying，源自於美國數學家發明。

由函式回傳函式的應用既深奧且複雜。想看到更多範例，可查看`Express`或`Koa`(受歡迎的JavaScript Web開發框架)的中介軟體套件：中介軟體通常會是一個會回傳函式的函式。

## 遞迴

函式會呼叫自己。如果函式會使用逐漸縮小的輸入集合來做同一件事情時，這是一種特別強大的技術。

範例：在乾草堆中找出一根針。

1. 如果在乾草堆中看到針，前往第三步
2. 從乾草堆中移除一根草。回到第一步
3. 完成!

```
function findNeedle(haystack) {
    if (haystack.length === 0) return "no haystack here!"; // 停止條件1
    if (haystack.shift() === 'needle') return "found it!"; // 停止條件2
    return findNeedle(haystack);
}

findNeedle(['hay', 'hay', 'hay', 'hay', 'needle', 'hay', 'hay']);
```

遞迴陣列有個**停止條件**，如果沒有，它會不斷遞迴執行，直到JavaScript解譯器認為呼叫堆疊過深為止(當機)。

範例2：找出一個數字的階乘。數字的階乘是將一個數字乘以它之前的每一個數字，它用數字加上驚嘆號來表示。所以4!是4 X 3 X 2 X 1 = 24。

```
function fact(n) {
    if (n === 1) return 1;  // 停止條件
    return n * fact(n - 1);
}
```

## 總結

泛函程式語言，概念非常強大，建議多花時間去了解它們。