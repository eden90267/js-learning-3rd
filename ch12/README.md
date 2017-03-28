# 迭代器與產生器

迭代器相當於書籤，可讓你知道你在哪裡。陣列就是個**可迭代**物件：它可容納許多東西(書頁)，並可給你一個迭代器(書籤)。

```
const book = [
    "Twinkle, twinkle, little bat!",
    "How I wonder what you're at!",
    "Up above the world you fly,",
    "Like a tea tray in the sky.",
    "Twinkle, twinkle, little bat!",
    "How I wonder what you're at!",
];
```

book陣列，可使用`values`方法取得迭代器。

```
// const it = book.values(); // chrome、node還不支援
const it = book[Symbol.iterator]();
```

參考資料：

- [Array.prototype[@@iterator]()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/@@iterator)
- [Array.prototype.values()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/values)

it迭代器是個書籤，要開始閱讀時，要呼叫迭代器的`next`方法，它會回傳一個物件，該物件有兩個特性：

- value：保存你目前的"頁數"
- done：當讀完最後一頁，會變成true

```
it.next(); // {value: "Twinkle, twinkle, little bat!", done: false}
it.next(); // {value: "How I wonder what you're at!", done: false}
it.next(); // {value: "Up above the world you fly,", done: false}
it.next(); // {value: "Like a tea tray in the sky.", done: false}
it.next(); // {value: "Twinkle, twinkle, little bat!", done: false}
it.next(); // {value: "How I wonder what you're at!", done: false}
it.next(); // {value: undefined, done: true}
it.next(); // {value: undefined, done: true}
it.next(); // {value: undefined, done: true}
```

已經完成時，`value`是`undefined`，`done`這時才`true`，它不會在最後一頁告訴你是done是true了。

※ 物件可提供自己的迭代機制，可建立一個"壞迭代器"來修改`done`值：這應該視為一種有缺陷的迭代器。一般來說，要使用正確的迭代器行為。

我們可在`it.next()`之間做些事情。換句話說，它會幫我們保存位置。

`for...of`迴圈就是使用迭代器：`for...of`迴圈可以與**任何**提供迭代器的東西合作。

用`while`迴圈與迭代器來模擬`for...of`迴圈：

```
let current = it.next();
while(!current.done) {
    console.log(current.value);
    current = it.next();
}
```

迭代器是獨特的，每當你建立一個新迭代器，就會從頭開始，也可在不同的地方使用許多迭代器。

```
const it1 = book[Symbol.iterator]();
const it2 = book[Symbol.iterator]();

it1.next(); // {value: "Twinkle, twinkle, little bat!", done: false}
it1.next(); // {value: "How I wonder what you're at!", done: false}

it2.next(); // {value: "Twinkle, twinkle, little bat!", done: false}

it1.next(); // {value: "Up above the world you fly,", done: false}
```

兩個迭代器，是獨立的。

## 迭代協定

**迭代器協定**，可讓任何物件都是可迭代的。

建立一個紀錄類別，可為訊息加上時戳。內部可用陣列來儲存加上時戳的訊息：

```
class Log {
    constructor() {
        this.messages = [];
    }
    add(message) {
        this.messages.push({message, timestamp: Date.now()});
    }
}
```

要迭代紀錄項目時怎麼辦? 當然可以存取`log.messages`，但如果我們想要直接使用可迭代的方式來處理紀錄，就像處理陣列一樣，不是比較好嗎?

可透過**迭代協定**來做這件事。迭代協定說，如果你的類別提供一個符號方法`Symbol.iterator`，且它回傳一個具有迭代行為的物件(有next方法，可回傳具有value與done特性的物件)，那麼它就是可迭代的!

讓`Log`類別有`Symbol.iterator`方法：

```
class Log {
    constructor() {
        this.messages = [];
    }
    add(message) {
        this.messages.push({message, timestamp: Date.now()});
    }
    [Symbol.iterator]() {
        return this.messages[Symbol.iterator]();
    }
}
```

現在就可以迭代Log的實例，就像它是個陣列：

```
const log = new Log();
log.add("first day at sea");
log.add("spotted whale");
log.add("spotted another vessel");
// ...

for(let entry of log) {
    console.log(`${entry.message} @ ${entry.timestamp}`);
}
```

也可編寫自己的迭代器：

```
class Log {
    ...
    [Symbol.iterator]() {
        let i = 0;
        const messages = this.messages;
        return {
            next() {
                if (i >= messages.length)
                    return { value: undefined, done: true };
                return { value: messages[i++], done: false };
            }
        }
    }
}
```

迭代器也可以用來表示值永遠不會結束的物件。

產生Fibonacci數字(Fibonacci序列的數字是它前面兩個數字的總和)：

1,1,2,3,5,8,13,21,34,55,89,144,...

它很適合當成迭代器範例。這個迭代器的`done`永遠不會回傳`true`。

```
class FibonacciSequence {
    [Symbol.iterator]() {
        let a = 0, b = 1;
        return {
            next() {
                let rval = {value: b, done: false};
                b += a;
                a = rval.value;
                return rval;
            }
        }
    }
}
```

```
const fib = new FibonacciSequence();
let i = 0;
for (let n of fib) {
    console.log(n);
    if (++i > 9) break;
}
```

## 產生器

是一種函式，它會使用迭代器來控制執行的方式。一般函式會接收引數與回傳一個值，但除此之外，呼叫方沒辦法控制函式。當你呼叫函式時，就會放棄對函式的控制權，直到它回傳結果為止。但如果使用產生器的話就不是如此，**你可以控制函式的執行**。

產生器可做兩件事：

1. 可以控制函式的執行，讓它以分開的步驟(discrete step)來執行
2. 可以在函式運行時與它溝通

產生器就像一般函式，但有兩個不同地方：

- 函式可以在任何地方將控制權"**歸還**"給呼叫方
- 當你呼叫產生器，它不會馬上執行，但會得到一個迭代器。當你呼叫迭代器的`next`方法，函式才會執行。

在JavaScript中，產生器的表示法是在`function`關鍵字前面加上一個星號，除此之外，用法與一般函式一模一樣。如果一個函式是個產生器，除了`return`之外，你也可以使用`yield`。

這個產生器會回傳彩虹的所有顏色：

```
function* rainbow() { // 星號將它標成產生器
    yield 'red';
    yield 'orange';
    yield 'yellow';
    yield 'green';
    yield 'blue';
    yield 'indigo';
    yield 'violet';
}
```


記得，當你呼叫產生器，你會得到一個迭代器。我們要來呼叫函式，並逐步執行迭代器。

```
const it = rainbow();
it.next(); // {value: "red", done: false}
it.next(); // {value: "orange", done: false}
it.next(); // {value: "yellow", done: false}
it.next(); // {value: "green", done: false}
it.next(); // {value: "blue", done: false}
it.next(); // {value: "indigo", done: false}
it.next(); // {value: "violet", done: false}
it.next(); // {value: undefined, done: true}
```

因為`rainbow`產生器會回傳一個迭代器，也可在`for...of`迴圈中使用它：

```
for (let color of rainbow()) {
    console.log(color);
}
```

### yield運算式與雙向溝通

產生器可在產生器與它的呼叫方之間進行**雙向**溝通。這是利用`yield`運算式來求值的。

運算式會產生一個值，`yield`是個運算式，所以它必須求出某個東西的值。它用來求值的東西，是呼叫方每次呼叫產生器的迭代器的`next`時提供的引數。

考慮一個可以對話的產生器：

```
function* interrogate() {
    const name = yield "What is your name?";
    const color = yield "What is your favorite color?";
    return `${name}'s favorite color is ${color}`;
}
```

當呼叫該產生器，會得到一個迭代器，接著呼叫next時，它會執行第一行。那行裡面有yield運算式，產生器必須將控制權交還給呼叫方。呼叫方必須再次呼叫next，才能處理第一行，且name可接收next回傳的值。

```
const it = interrogate();
it.next();       // {value: "What is your name?", done: false}
it.next("Eden"); // {value: "What is your favorite color?", done: false}
it.next("blue"); // {value: "Eden's favorite color is blue", done: true}
```

產生器功能非常強大，可讓呼叫方控制函式的執行。此外，因為呼叫方可傳遞資訊給產生器，產生器甚至可以根據傳入的資訊來修改它自己的行為。

### 產生器與return

`yield`陳述式本身不會結束產生器，就算它是產生器最後一個陳述式。在產生器的任何地方呼叫`return`，會讓`done`變成`true`，而`value`特性是你想回傳的東西。

```
function* abc() {
    yield 'a';
    yield 'b';
    return 'c';
}


const it = abc();
it.next();        // {value: "a", done: false}
it.next();        // {value: "b", done: false}
it.next();        // {value: "c", done: true}
```

但要記得，產生器的使用者不一定會注意當`done`是`true`時的`value`特性，例如用`for...of`迴圈，就不會匯出"c"。

```
for (let l of abc()) {
    console.log(l);
}
```

建議不要在產生器裡面使用`return`來回傳有意義的值。有意義的值應用`yield`丟出。`return`只應用來提早停止產生器。通常建議`return`不要提供任何值。

## 總結

迭代器是一個標準的機制，可讓集合或物件提供複數值。他們可將重要且常見的動作標準化。

產生器可讓你進一步控制與訂製函式：呼叫方再也不是只能事前提供資料，等待函式回傳，接收函式結果。實質上，產生器可**延遲執行**，且**只在必要執行**，可提供強大模式來管理**非同步執行**。