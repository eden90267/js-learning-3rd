# Node

Node問世，讓JavaScript跳到伺服器，無意中啟動了另一種非傳統的用法

- web應用程式開發
- 桌上型應用程式開發
- 系統指令碼

某種意義上，Node讓JavaScript得以長大成人。

## Node基礎知識

Node沒有DOM。有些API是Node專用的。

window與document是瀏覽器端的物件。

## 模組

**模組**(Module)是包裝程式碼與指定它的**命名空間**的機制。命名空間是一種避免**名稱衝突**的方法。

amanda.js

```
function calculate(a, x, n) {
    if (x === 1) return a * n;
    return a * (1 - Math.pow(x, n)) / (1 - x);
}

module.exports = calculate;
```

tyler.js

```
function calculate(r) {
    return 4 / 3 * Math.PI * Math.pow(r, 3);
}

module.export = calculate;
```

`module.exports = calculate`是很重要的一行。`module`是一個特殊的物件，Node用它來讓你可實作模組。你指派給它的`exports`特性的東西，就是從模組**匯出**的東西。

app.js，看如何匯入這些模組，並做適當的命名：

```
const geometricSum = require('./amanda');
const sphereVolume = require('./tyler.js');

console.log(geometricSum(1,2,5)); // 31
console.log(sphereVolume(2));      // 33.510321638291124
```

模組可匯出任何型態的值(甚至基本型態)。希望模組裡面函式不是只有一個，而是許多個，此時，你可匯出一個物件。

```
module.exports = {
    geometricSum(a, x, n) { // ES6縮寫語法
        if (x === 1) return a * n;
        return a * (1 - Math.pow(x, n)) / (1 - x);
    },
    arithmeticSum(n) {
        return (n + 1) * n / 2;
    },
    quadraticFormula(a, b, c) {
        const D = Math.sqrt(b * b - 4 * a * c);
        return [(-b + D) / (2 * a), (-b - D) / (2 * a)];
    }
};
```

```
const amanda = require('./amanda');

console.log(amanda.geometricSum(1,2,5));       // 31
console.log(amanda.quadraticFormula(1,2,-15)); // [ 3, -5 ]
```

這個模式很常見，所以它有一個簡化的語法，。使用一個特殊變數，稱為`exports`。

可用更扎實的方式來改寫：

```
exports.geometricSum = function (a, x, n) {
    if (x === 1) return a * n;
    return a * (1 - Math.pow(x, n)) / (1 - x);
}

exports.arithmeticSum = function (n) {
    return (n + 1) * n / 2;
}

exports.quadraticFormula = function (a, b, c) {
    const D = Math.sqrt(b * b - 4 * a * c);
    return [(-b + D) / (2 * a), (-b - D) / (2 * a)];
}
```

※ `exports`縮寫只能用來匯出物件，如果想要匯出函式或其他的值，就必須使用`module.exports`。

## 核心模組、檔案模組與npm模組：

mnodules有三種：

- 核心模組
- 檔案模組
- npm模組

**核心模組**是Node本身提供的預留模組名稱，例如`fs`與`os`。

**檔案模組**：建立一個檔案，指派給`module.exports`，接著要求那個檔案。

**npm模組**只是位於特殊目錄`node_modules`的檔案模組。

當你使用`require`函式，Node會以你傳入的字串來判定模組的型態。

模組型態：

| 型態 | 傳給require的字串                    | 範例                                                                                                  |
|------|--------------------------------------|-------------------------------------------------------------------------------------------------------|
| 核心 | 不是以/、./或../開頭的               | require('fs'); require('os'); require('http'); require(child_process);                                |
| 檔案 | 以/、./或../開頭的                   | require('./debug.js'); require('/full/path/to/module.js'); require('../a.js'); require('../../a.js'); |
| npm  | 不是核心模組，且不是/、./或../開頭的 | require('debug'); require('express'); require('chalk'); require('koa'); require('q');                 |

有些核心模組，例如process與buffer都是**全域**的，一定可以用，且不需明確使用require陳述式。

核心模組：

| 模組           | 全域 | 說明                                           |
|----------------|------|------------------------------------------------|
| assert         | 否   | 測試用                                         |
| buffer         | 是   | 用於操作輸入/輸出(I/O) (主要是檔案與網路)      |
| child_process  | 否   | 執行外部程式(Node及其他)的函式                 |
| cluster        | 否   | 可讓你用多個處理序來提升效能                   |
| crypto         | 否   | 內建的加密程式庫                               |
| dns            | 否   | 網域名稱系統(DNS)函式，用來解析網域名稱        |
| domain         | 否   | 可將I/O與其他非同步操作分組，來隔離錯誤        |
| events         | 否   | 支援非同步事件的公用程式                       |
| fs             | 否   | 檔案系統操作                                   |
| http           | 否   | HTTP伺服器與相關的公用程式                     |
| https          | 否   | HTTPS伺服器與相關的公用程式                    |
| net            | 否   | 非同步通訊端網路API                            |
| os             | 否   | 作業系統公用程式                               |
| path           | 否   | 檔案系統路徑名稱公用程式                       |
| punycode       | 否   | 使用有限的ASCII子集合來編碼Unicode             |
| querystring    | 否   | 解析與建構URL查詢字串的公用程式                |
| readline       | 否   | 互動式I/O公用程式；主要用於指令列程式          |
| smalloc        | 否   | 可明確配置記憶體來做緩衝                       |
| stream         | 是   | 串流式資料傳輸                                 |
| string_decoder | 否   | 將緩衝器轉換成字串                             |
| tls            | 否   | 傳輸層安全性(TLS)通訊公用程式                  |
| tty            | 否   | 底層TeleTYpewriter(TTY)函式                    |
| dgram          | 否   | 使用者資料包通訊協定(UDP)網路公用程式          |
| url            | 是   | 解析公用程式                                   |
| util           | 否   | 網際網路節點公用程式                           |
| vm             | 否   | 虛擬(JavaScript)機器：可進行中繼編程與環境創建 |
| zlib           | 否   | 壓縮公用程式                                   |


npm模組。npm模組是具有特定命名規範的檔案模組。需要會在node_modules目錄裡(從專案目錄下往上找該模組，找不到會一直往上層目錄找，到根目錄為止)。

node_modules重點在於，它是一個隨時刪除的目錄，且npm可以用package.json列舉的依賴關係重新建立它。

## 使用Function模組來自訂模組

模組經常會匯出物件，有時會匯出函式。另外有種常見的模式：由模組匯出一個要被立刻呼叫的函式。你要使用的是該函式的回傳值(可能是函式本身)(換句話說，你不會使用被回傳的函式，你會呼叫那個函式，並使用它回傳的東西)。

這模式的使用時機，是當模組需要某種方式來訂製，或接收封閉環境的資訊時。

考慮這個現實世界的npm套件debug。當你匯入debug時，它會接收一個字串，這個字串會被當成紀錄的開頭文字，來分辨程式各個部分的紀錄：

```
const debug = require('debug')('main');
debug("starting"); // 會log "main starting +0ms"
                   // 如果啟用除錯的話
```

※ 要用debug程式庫來啟用除錯功能，可設定DEBUG環境變數。範例中會設定DEBUG=main。你也可設定DEBUG=*啟用所有除錯訊息。

該範例中可看到，debug模組會回傳一個函式，而且那函式本身會回傳一個函式，它會"記得"第一個函式的字串。我們已經將值"植入"那個模組了。

來看一下如何實作自己的debug模組：

```
let lastMessage;

module.exports = function(prefix) {
    return function(message) {
        const now = Date.now();
        const sinceLastMessage = now - (lastMessage || now);
        console.log(`${prefix} ${message} +${sinceLastMessage}ms`);
        lastMessage = now;
    }
}
```

當匯入模組很多次，會發生什麼事?

```
const debug1 = require('./debug')('one');
const debug2 = require('./debug')('two');

debug1('started first debugger!');
debug2(`started second debugger!`);

setTimeout(function() {
    debug1('after some time...');
    debug2('what happens?');
}, 200);
```

測試結果：

```
one started first debugger! +0ms
two started second debugger! +32ms
one after some time... +201ms
two what happens? +0ms
```

Node只會匯入給訂的模組一次(每次Node app執行時)。會使用同一實例。就算debug1與debug2
有獨立函式，它們都有同一個lastMessage的參考。

這種行為是安全且合理的。

```
let lastMessage; // 可以移到回傳函式的本文，就可以有獨立的值了

module.exports = function(prefix) {
    return function(message) {
        const now = Date.now();
        const sinceLastMessage = now - (lastMessage || now);
        console.log(`${prefix} ${message} +${sinceLastMessage}ms`);
        lastMessage = now;
    }
}
```

## 操作檔案系統

建立檔案方式是使用`fs.writeFile`。

```
const fs = require('fs');

fs.writeFile('hello.txt', 'hello from Node!', function(err) {
    if (err) return console.log('Error writing to file.');
});
```

當你呼叫Node應用程式時，它會繼承你執行它**的時候的工作目錄**。

```
$ cd /home/jdoe/fs
$ node write.js     # 建立/home/jdoe/fs/hello.txt

$ cd ..
$ node fs/write.js  # 建立/home/jdoe/hello.txt
```

Node提供一種特殊變數`__dirname`，它一定會將目錄設定在原始檔案所在之處。可將範例修改成:

```
const fs = require('fs');

fs.writeFile(__dirname + '/hello.txt', 'hello from Node!', function(err) {
    if (err) return console.log('Error writing to file.');
});
```

現在write.js一定會在`/home/<jdoe>/fs`裡面建立hello.txt(write.js的位置)。如果使用字串串接功能來連結`__dirname`與檔名，它有可能在某些平台是無效的。Node的**path**模組提供**可在各種平台使用的路徑名稱**公用程式。

```
const fs = require('fs');
const path = require('path');

fs.writeFile(path.join(__dirname,'hello.txt'), 'hello from Node!', function(err) {
    if (err) return console.log('Error writing to file.');
});
```

`path.join`會使用適合作業系統的目錄分隔符號來結合目錄元素，且通常是好的做法。

讀回檔案內容? 可使用`fs.readFile`。

```
const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, 'hello.txt'), function(err, data) {
    if (err) return console.error('Error reading file.');
    console.log('Read file contents:');
    console.log(data);
});
```

但你可能會不滿意它的結果：

```
Read file contents:
<Buffer 68 65 6c 6c 6f 20 66 72 6f 6d 20 4e 6f 64 65 21>
```

如果你將這些十六進位碼轉換成對應的ASCII/Unicode，你會發現它其實是hello from Node!，但顯然這個程式不是很人性化。如果你沒告知`fs.readFile`所使用的編碼，它會回傳一個**緩衝器**，裡面存有原始的二進位資料。雖我們沒明確地在write.js中指定編碼，但預設的字串編碼是UTF-8(Unicode編碼)。我們可修改read.txt來指定UTF-8，並取得期望的結果：

```
const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, 'hello.txt'), {encoding: 'utf8'}, function(err, data) {
    if (err) return console.error('Error reading file.');
    console.log('Read file contents:');
    console.log(data);
});
```

fs的所有函式都有同步版的等效函式(名稱結尾是"Sync")。在write.js中，可改用同步等效函式：

```
fs.writeFileSync(path.join(__dirname,'hello.txt'), 'hello from Node!');
```

read.js中：

```
const data = fs.readFileSync(path.join(__dirname, 'hello.txt'), {encoding: 'utf8'});
```

使用同步版本的時候，是用例外來處理錯誤來讓範例更強固，我們會將他們包在`try/catch`區塊裡面：

```
try {
    fs.writeFileSync(path.join(__dirname, 'hello.txt'), 'hello from Node!');
} catch (err) {
    console.error('Error writing file.');
}

```

※ 同步檔案系統是相當容易使用的。但，如果你要編寫web server或網站應用程式，記得Node的效能來自非同步執行，此時你一定要使用非同步版本。如果是編寫指令列公用程式，使用同步版本通常沒什麼問題。

你可以用`fs.readdir`來列出目錄中的檔案。

```
const fs = require('fs');

fs.readdir(__dirname, function(err, files) {
    if (err) return console.error('Unable to read directory contents');
    console.log(`Contents of ${__dirname}:`);
    console.log(files.map(f => '\t' + f).join('\n'));
});

// result:
// Contents of C:\Users\eden_liu\js-learning-3rd\ch20:
//         amanda.js
//         app.js
//         debug.js
//         debug_test.js
//         hello.txt
//         ls.js
//         read.js
//         README.md
//         tyler.js
//         write.js
```

fs模組含有許多其他的檔案系統函式

- 刪除檔案(`fs.unlink`)
- 移除檔案或更改檔名(`fs.rename`)
- 取得檔案與目錄的資訊(`fs.stat`)

## 程序

每一個正在執行的Node程式都會存取一個稱為`process`的變數，可讓程式取得它自己的執行情況的資訊，以及控制執行。例如，你的應用程式遇到一個很嚴重的錯誤，無法或沒必要繼續執行，可呼叫`process.exit`來立刻停止執行。也可提供一個數值的**結束代碼**，指令碼會用它來判斷你的程式是否成功結束。0代表"沒有錯誤"，非0的結束代碼代表有錯誤。

以下是一個範例：

```
const fs = require('fs');

fs.readdir('data', function(err, files) {
    if (err) {
        console.error("Fatal error: couldn't read data directory.");
        process.exit(1);
    }
    const txtFiles = files.filter(f => /\.txt$/i.test(f));
    if (txtFiles.length === 0) {
        console.log("No .txt files to process.");
        process.exit(0);
    }
    // 處理.txt檔...
});
```

process物件
