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

故意定義一個具有特定範圍的函式，明確地讓它只能在那個範圍內使用。這通常稱closure。