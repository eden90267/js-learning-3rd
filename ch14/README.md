# 非同步程式設計

JavaScript想成擁有三個不同時代的非同步支援：

- 回呼時代
- promise時代
- 產生器時代

產生器本身無法提供任何類型的非同步支援：它們必須依賴promise或特殊型態的回呼來提供非同步行為。同樣的，雖然promise很實用，它們也依賴回呼(且回呼本身對事件這類東西來說仍然很好用)。

除了使用者輸入外，還有三件事會用到非同步技術：

- 網路請求(例如Ajax呼叫)
- 檔案系統操作(讀取/寫入檔案等等)
- 會故意延遲時間的功能(例如鬧鐘)

## 比喻

在未訂位的情況下，取得客滿的餐廳的桌位。

有間餐廳可讓你不用排隊等候，當有位置時，餐廳會撥打你的手機號碼，這就是**回呼**。你必須提供一些東西，讓它可以在有位置時通知你。餐廳會忙它的工作，你也可以做你自己的事。

另一間餐廳會給你一個呼叫器，它會在有位置時發出聲音，這比較像**promise**：別人會給你一個東西，來讓你知道已經有位置了。

## 回呼

最古老的非同步機制，處理過使用者輸入與逾時。回呼只是一個你自己編寫的程式，它會在未來的某個時機被呼叫。

一般情況下，你會將這些回呼函式提供給其他的函式，或將它們設定為物件的特性(或較罕見的，放到陣列中提供)，回呼通常是非同步函式(但不是一定如此)。

```
console.log("Before timeout: " + new Date());
function f() {
    console.log("After timeout: " + new Date());
}
setTimeout(f, 60*1000); // 一分鐘
console.log("I happen after setTimeout!");
console.log("Me too!");
```

結果：

```
Before timeout: Thu Mar 30 2017 00:36:56 GMT+0800 (PHT)
I happen after setTimeout!
Me too!
After timeout: Thu Mar 30 2017 00:37:56 GMT+0800 (PHT)
```

### setInterval與clearInterval

除了執行函式一次之後就會停止的`setTimeout`之外，還有一種`setInterval`，它會不斷地在指定的間隔執行回呼，或者直到你呼叫`clearInterval`為止。

```
const start = new Date();
let i=0;
const intervalId = setInterval(function() {
    let now = new Date();
    if (now.getMinutes() !== start.getMinutes() || ++i>10)
        return clearInterval(intervalId);
    console.log(`${i}: ${now}`);
}, 5*1000);
```

### 範圍與非同步執行

非同步執行有個經常造成困惑(與錯誤)的地方，就是範圍與closure影響非同步執行的方式。每當你呼叫函式，就會建立一個closure：在函式裡面建立的所有變數(包括引數)，都會存留，可讓某個東西存取它們。

考慮一個countdown的函式，它的目的是建立5秒的倒數計時：

```
function countdown() {
    let i;
    console.log("Countdown:");
    for (i = 5; i >= 0; i--) {
        setTimeout(function () {
            console.log(i === 0 ? "GO" : i);
        }, (5 - i) * 1000);
    }
}

countdown();
```

output：-1 * 6，然後結束。

這次用let，但是是在for迴圈外宣告的，所以有同樣問題。for迴圈會全部執行，讓i的值是-1，之後回呼才會開始執行。問題在於，當它們執行時，i的值已經是-1了。

呼叫countDown，會建立一個closure，裡面有變數i。for迴圈裡面建立的所有回呼(非同步)都可存取i一都是同一個。

計算逾時(`(5 - i) * 1000`)，它會如期動作：因為它是同步計算的。呼叫setTimeout是同步的，非同步的地方在於被傳入的setTimeout的函式，它也是發生問題的地方。

可用IIFE來解決，或更簡單的，直接將宣告i移到for迴圈宣告裡面：

```
function countdown() {
    console.log("Countdown:");
    for (let i = 5; i >= 0; i--) {
        setTimeout(function () {
            console.log(i === 0 ? "GO" : i);
        }, (5 - i) * 1000);
    }
}

countdown();
```

這裡重點，必須小心宣告回呼的範圍：它們都可以存取那個範圍(closure)裡面的任何東西。所以實際回呼執行，值可能會不一樣。所有非同步技術都會有這原則。

### 錯誤優先回呼

Node。大家習慣使用回呼第一個引數來接收錯誤物件。如果那個錯誤是null或undefined，就是沒有錯誤。

考慮Node中讀取檔案的內容，它會遵循錯誤優先回呼做法：

```
const fs = require('fs');

const fname = 'may_or_may_not_exist.txt';
fs.readFile(fname, function(err, data) {
    if (err) return console.error(`error reading file ${fname}: ${err.message}`);
    console.log(`${fname} contents: ${data}`);
});
```

先查看err是不是truthy。記下錯誤然後回傳console.error，讓函式繼續執行。

錯誤優先回呼，是Node開發的標準(不使用promise時)。強烈建議若要編寫會接收回呼的介面，要遵循錯誤優先慣例。

### 回呼地獄

回呼缺點：當要等待很多事情才可以繼續工作，將會很難管理它們。

等候一個Node app，它需要取得三個不同檔案的內容，接著再等待60秒，才能結合這些檔案的內容，並寫到第四個檔案：

```
const fs = require('fs');

fs.readFile('a.txt', function(err, dataA) {
    if (err) console.error(err);
    fs.readFile('b.txt', function(err, dataB) {
        if (err) console.error(err);
        fs.readFile('c.txt', function(err, dataC) {
            if (err) console.error(err);
            setTimeout(function() {
                fs.writeFile('d.txt', dataA+dataB+dataC, function(err) {
                    if (err) console.error(err);
                });
            }, 60*1000);
        });
    });
});
```

這就是回呼地獄，通常有個**三角形的程式碼區塊**，**使用嵌套到天際的大括號**。有錯誤要做拋出，就又會有另一種討厭的情形。

考慮以下這個比較簡單的範例：

```
function readSketchyFile() {
    try {
        fs.readFile('does_not_exist.txt', function (err, data) {
            if (err) throw err;
        });
    } catch (err) {
        console.log(`warning: minor issue occurred, program continuing`);
    }
}
readSketchyFile();
```

乍看沒問題，但會無法動作，這個程式會當掉。因為`try...catch`區塊**只可以在同一個函式內工作**。錯誤是被丟入fs.readFile當成回呼來呼叫的匿名函式裡面。

且沒有任何保護機制來避免回呼的次數或永遠不被呼叫。

此時，promise應運而生。