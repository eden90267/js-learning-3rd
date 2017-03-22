# 函式

**函式**是一種五臟俱全的陳述式集合，他會被視為一個單位執行。函式是JavaScript強大的功能與表達力的核心。

每個函式都有一個本文，他是陳述式的組合，構成函式。

使用函式的名稱與括號來**呼叫**(call)函式。(也稱為**運行**(running)、**執行**(executing)、**引用**(invoking)或**指派**(dispatching))

呼叫函式是一種運算式。

## 回傳值

## 呼叫 v.s. 參考

在JavaScript中，函式是物件，因此可到處傳遞與賦值。

了解**呼叫**函式與只是**參考**函式的不同是很重要的事情。

- 函式識別碼後面加上括號：JavaScript就知道要呼叫它，他會執行函式的本文，運算式會得到回傳值。
- 當沒有加上括號，只是參考函式，它**不會**被呼叫。

可將函式指派給一個變數，再用該變數來呼叫。

```
const f = getGreeting;
f();
```

或指派給物件特性：

```
const o = {};
o.f = getGreeting;
o.f();
```

甚至將函式放入陣列：

```
const arr = [1, 2, 3];
arr[1] = getGreeting;
arr[1]();
```

## 函式引數

函式宣告式的主要機制是函式**引數**，引數與變數一樣，在函式呼叫前不會存在。

```
function avg(a, b) {
  return (a + b) / 2;
}
```

在這函式宣告式中，a與b稱為**形式引數**，當函式被呼叫，形式引數會接收值，變成**實際引數**：

```
avg(5. 10);
```

實際引數很像是變數，只是給函式本文專用的。

引數**只會在函式裡面生存**。

```
const a = 5, b = 10;
avg(a, b);
```

函式裡面若將a, b值重新指派，並不會影響外面的a, b值。因他們是兩個不同實體，只是剛好名稱一樣。

在函式裡面將值指派給引數，並不會影響函式外的任何變數。但，可以用這種方式修改函式內的物件型態，當物件本身改變時，函式外面可以看到。

基本型態與物件的主要差別，你無法修改基本型態(基本型態變數值可以更改，但基本型態的**值**本身無法改變)。另一方面，可修改物件。

函式內與函式外，都**參考到同一個物件**。

```
function f(o) {
	o.message = "set in f";
	o = {
		message: "new object!"
	}
	console.log(`inside f: o.message="${o.message}" (after assignment)`);
}
let o = {
	message: 'initial value'
};
console.log(`before calling f: o.message="${o.message}"`);
f(o);
console.log(`after calling f: o.message="${o.message}"`);
```

```
before calling f: o.message="initial value"
inside f: o.message="new object!" (after assignment)
after calling f: o.message="set in f"
```

掌握一個要點：暸解引數o(函式內)與變數o(函式外)之間的不同。呼叫f時，他們都指向同一物件，但當o在f裡面被賦值時，他會指向一個**新的**、**不同**的物件。函式外的o仍然會指向原本的物件。

JavaScript的基本型態是**值型態**，因它們會被四處傳遞，值會被複製。物件是**參考型態**，他們被四處傳遞時，可能有兩個變數參考到同物件。

### 引數構成函式嗎？

許多語言中，函式的簽章含引數。例如C，`f()`與`f(x)`是不同函式。

JavaScript沒有這種區別，當你有一個函式叫做f，可用0或1或10個引數來呼叫它，而且呼叫的是同一個函式。也就是說，可用任何數量的引數來呼叫任何函式。如果沒提供引數，它們會私下接收undefined值。

```
function f(x) {
  return `in f: x=${x}`;
}
f(); // "in f: x=undefined"
```

### 解構引數

```
function getSentence({ subject, verb, object }) {
  return `${subject} ${verb} ${object}`;
}

const o = {
  subject: "I",
  verb: "love",
  object: "JavaScript",
}
getSentence(o); // "I love JavaScript"
```

解構賦值，特性名稱必須是識別碼字串。

也可解構陣列：

```
function getSentence({ subject, verb, object }) {
  return `${subject} ${verb} ${object}`;
}

const arr = ["I", "love", "JavaScript"];
getSentence(arr); // "I love JavaScript"
```

可使用**擴張運算子**(...)來收集所有其他引數。

```
function addPrefix(prefix, ...words) {
  const prefixedWords = [];
  for (let i = 0; i < words.length; i++) {
    prefixedWords[i] = prefix + words[i];
  }
  return prefixedWords;
}

addPrefix("con", "verse", "vex"); // ["converse", "convex"]
```

宣告函式要使用擴張運算子，他必須是**最後一個引數**。

擴張運算子，用來取代ES5的arguments“類陣列”物件。

### 預設引數

ES6有新功能，可以指定引述的預設值。

```
function f(a, b = "default", c = 3) {
  return `${a} - ${b} - ${c}`;
}
f(5, 6, 7); // "5 - 6 - 7"
f(5, 6);    // "5 - 6 - 3"
f(5);       // "5 - default - 3"
f();        // "undefined - default - 3"
```

## 將函式當成物件的特性

當函式是物件的特性時，它通常被稱為**方法**，來與一般函式區分。

也可將方法加到物件常值：

```
const o = {
  name: "Wallace",
  bark: function() { return 'Woof!'; },
}
```

ES6簡寫語法：

```
const o = {
  name: 'Wallace',
  bark() { return 'Woof!'; },
}
```

## this 關鍵字

函式本文中，可使用`this`的特殊唯讀值。通常這與OOP有關，但在JavaScript中，它有許多用途。

`this`關鍵字與物件特性函式有關。當你呼叫方法時，`this`關鍵字就代表你呼叫的方法所屬的物件的值。

```
const o = {
  name: 'Wallace',
  speak() { return `My name is ${this.name}!` },
}
```

當呼叫o.spack()，this關鍵字會綁定o：

```
o.speak();
```

重點在於，這種綁定是根據**呼叫函式的方式，而不是宣告函式的地方**。也就是說，this會綁定o，不是因為speak是o的特性，而是因為我們直接用o呼叫它(o.speak)。

```
const speak = o.speak;
speak === o.speak; // true
speak();           // "My name is !"
```

JavaScript不知道函式是在o裡面宣告的，所以this會被綁定undefined。

如果函式沒有用到this，我們通常會將它稱為函式，無論它被宣告的地方在哪。