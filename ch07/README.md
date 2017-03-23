# 範圍

**範圍**決定變數、常數與引數在哪些地方會被視為已定義。

當說某個變數的範圍是一個函式，在函式本文內，形式引數在函式被呼叫前不會存在(呼叫後會變成
實際引數)。

變數與常數被建立前不存在，他們不在範圍內，直到`let`或`const`宣告它們為止。(var是特例)

一些語言中，宣告與定義有明確差別。

- 宣告：代表要藉由給它一個識別碼，來聲明它的存在
- 定義：代表宣告它，**並且**給它一個值

在JavaScript中，這兩個名詞是交換使用，因任何變數被宣告時，都會被指定一個值(沒明確指定就是undefined)。

## 範圍 v.s. 存在

- 範圍(or **可見性**)：目前正執行的程式段落(或稱**執行環境**)可以看到與操作某個識別碼。
- 存在：代表有一個識別碼保存了某些已經分配(保留)給他的記憶體。

即將看到一些存在，但不在範圍內的變數。

當一個東西不復存在，JavaScript不會馬上回收記憶體：它只會記住該項目不再需要保留，記憶體回收程序會自動進行回收，除非極度要求，否則是自動進行的。

## 語彙與動態範圍

當你閱讀程式的原始碼時，看的是它的**語彙結構**。當程式真的在運行時，會四處跳躍執行。

JavaScript的範圍是**語彙範圍**，可藉由程式來知道哪些變數在範圍內。不過不代表可明確看出範圍。

語彙範圍，當一個變數位於你**定義**的函式的範圍之內(相對於**呼叫**)，該變數就會在該函式的範圍之內。

```
const x = 3;
function f() {
  console.log(x);
  console.log(y); // 當機
}

const y = 3;
f();
```

這是一個語彙範圍的範例：函式`f`可存取當它被定義時可使用的識別碼，而不是當它被呼叫時可使用的識別碼。

JavaScript的語彙範圍適用**全域範圍**、**區塊範圍**與**函式範圍**。

## 全域範圍

範圍是階層式的，所以在樹狀結構的底層一定會有某個東西，也就是當你開始執行程式，私下使用的範圍。稱**全域範圍**。

JavaScript程式開始執行後，呼叫任何函式之前，它執行的是全域範圍。也就是說，全域範圍宣告的所有東西，都可在程式的所有範圍中使用。

如何明智使用全域，是重要課題。應該避免的是，**依賴全域範圍的東西**。

```
let name = "Irena";
let age = 25;

function greet() {
  cosole.log(`Hello, ${name}!`);
}
function getBirthYear() {
  return new Date().getFullYear - age;
}
```

較好作法是將使用者資訊放在單一物件裡：

```
let user = {
  name: "Irena",
  age = 25,
};

function greet() {
  cosole.log(`Hello, ${user.name}!`);
}
function getBirthYear() {
  return new Date().getFullYear - user.age;
}
```

還可更好，改善這些函式，讓它們不依賴全域範圍：

```
function greet(user) {
  cosole.log(`Hello, ${user.name}!`);
}
function getBirthYear(user) {
  return new Date().getFullYear - user.age;
}
```

現在函式可從**任何**範圍呼叫，且會明確地傳入使用者。

## 區塊範圍

`let`與`const`都會以所謂的**區塊範圍**來宣告識別碼。

```
console.log('before block');
{
  console.log('inside block');
  const x = 3;
  console.log(x);
}
console.log(`outside block; x=${x}`); // ReferenceError: x is not defined
```

## 變數遮蓋

```
{
  let x = 'blue';
  console.log(x);      // "blue"
  {
    let x = 3;
    console.log(x);    // 3
  }
  console.log(x);      // "blue"
}
console.log(typeof x); // "undefined"
```

內部區塊的x與外部區塊的x是不同的變數，他會遮蓋(或隱藏)外部範圍定義的x。

```
{
  let x = { color: "blue" };
  let y = x;
  let z = 3;
  {
    let x = 5;
    console.log(x);        // 5
    console.log(y.color);  // "blue"

    y.color = "red";
    console.log(z);        // 3
  }
  console.log(x.color);    // "red", 物件在內部範圍被修改
  console.log(y.color);    // "red", x與y指向同一個物件
  console.log(z);          // 3
}
```

範圍是階層式的，你不用離開舊範圍就可以進入新範圍。這會建立範圍鏈，它決定哪些變數在範圍內：在目前範圍鏈裡面的所有變數都在範圍內，而且(只要他們沒有被遮蓋)可以被存取。

## 函式、Closure與語彙範圍

故意定義一個具有特定範圍的函式，明確地讓它只能在那個範圍內使用。這通常稱closure(函式周圍關閉範圍)。

```
let globalFunc;
{
  let blockVar = 'a';
  globalFunc = function() {
    console.log(blockVar);
  }
}
globalFunc();                // "a"
```

JavaScript發現在那個範圍裡面有一個函式被定義了(而且你可以在該範圍外面參考那個函式)，因此它必須保留那一個範圍。

closure**也可以**讓我們存取一般無法存取的東西：

```
let f;
{
  let o = { note: 'Safe' };
  f = function() {
    return o;
  }
}
let oRef = f();
oRef.note = "Not so safe after all!";
```

## 立即呼叫函式運算式

IIFE會宣告一個運算式，接著立刻執行它。

```
(function() {
  // 這是IIFE本文
})();
```

IIFE優點是，在它裡面的任何東西都有它自己的範圍，而且因為它是個函式，所以可以將某些東西傳出範圍。

```
const message = (function() {
  const secret = "I'm a secret!"; // 在IIFE範圍內是安全的
  return `The secret is ${secret.length} characters long.`;
})();
console.log(message);
```

IIFE經常回傳陣列、物件與函式。

考慮這個函式，它可以回傳它被呼叫的次數，且次數不會被竄改。

```
const f = (function() {
  let count = 0;
  return function() {
    return `I have been called ${++count} time(s).`;
  };
})();
f(); // I have been called 1 time(s).
f(); // I have been called 2 time(s).
// ...
```

雖ES6的區塊範圍變數在某種程度上可減少對IIFE的依賴，但IIFE仍然很常見，且當你想要建立一個closure，並將某個東西傳出去時，它是很實用的。

## 函式範圍與懸掛

在ES6加入let之前，變數用var來宣告的，而且有一種東西叫做**函式範圍**(全域變數是用var宣告的)。

當你用let宣告變數，他不會在被宣告的地方之前出現。當你用var宣告變數，它可以在**目前範圍內的任何地方**使用，甚至在它被宣告之前。

```
let var1;
let var2 = undefined;
var1;                 // undefined
var2;                 // undefined
undefinedVar;         // ReferenceError: notDefined is not defined
```

使用let，如果你試著在宣告變數前使用，會產生錯誤：

```
x;         // ReferenceError: x is not defined
let x = 3;
```

但, 使用var宣告變數，可在它們被宣告的地方之前使用它們。

```
x;         // undefined
var x = 3;
x;         // 3
```

使用var宣告變數，是採用一種稱為**懸掛**(hoisting)的機制。JavaScript會掃描整個範圍(函式或全域範圍)，任何用var宣告的變數都會被懸掛在最上面。重點在於，只有宣告式會被懸掛，**賦值式不會**。

```
var x; // 宣告(但賦值沒有)被懸掛
x;     // undefined
x = 3;
x;     // 3
```

你寫的程式：

```
if(x !== 3) {
  console.log(y);
  var y = 5;
  if (y === 5) {
    var x = 3;
  }
  console.log(y);
}
if(x === 3) {
  console.log(y);
}
```

JavaScript解讀方式：

```
var x;
var y;
if(x !== 3) {
  console.log(y);
  y = 5;
  if (y === 5) {
    x = 3;
  }
  console.log(y);
}
if(x === 3) {
  console.log(y);
}
```

在宣告變數之前使用它們，會產生沒必要的疑惑，而且容易出錯。

關於使用var來宣告變數，還有一件事情：JavaScript不在乎你是否重複定義變數。

```
var x = 3
if (x === 3) {
  var x = 2;
  console.log(x); // 2
}
console.log(x);   // 2
```

JavaScript解讀方式：

```
var x;
x = 3;
if (x === 3) {
  x = 2;
  console.log(x);
}
console.log(x);
```

var可用來建立新變數，且**變數不會像let一樣被覆蓋**。

新的變數x在if陳述式區塊會形成，但事實並非如此，整個程式只有一個x變數。

所以，可以了解為什麼會有let了。