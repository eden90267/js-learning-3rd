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

```
const o = {
  name: 'Julie',
  greetBackWards: function() {
    function getReverseName() {
      let nameBackwards = '';
      for (let i = this.name.length - 1; i >= 0; i--) {
        nameBackwards += this.name[i];
      }
      return nameBackwards;
    }
    return `${getReverseName()} si eman ym, olleH`;
  },
};
o.greetBackWards(); // TypeError: Cannot read property 'length' of undefined
```

呼叫o.greetBackWards()時，JavaScript會一如預期綁定this，但greetBackWords裡面呼叫getReverseName時，this會被綁到其他東西(全域物件 or undefined)。若要解決，常見作法是將第二變數指派給this。

```
const o = {
  name: 'Julie',
  greetBackWards: function() {
    const self = this;
    function getReverseName() {
      let nameBackwards = '';
      for (let i = self.name.length - 1; i >= 0; i--) {
        nameBackwards += self.name[i];
      }
      return nameBackwards;
    }
    return `${getReverseName()} si eman ym, olleH`;
  },
};
o.greetBackWards();
```

箭頭函式是解決這問題的方式。

## 函式運算式與匿名函式

匿名函式。我們知道運算式會求出一個值，函式是一種值。函式運算式只是一種宣告(或許未命名)函式的方式。你可將函式運算式指派給某一個東西(因而給他一個識別碼)，或立刻呼叫它(IIFE)。

函式運算式的語法與宣告函式一樣，只不過可以省略函式名稱。

```
const f = function() {
  // ...
}
```

匿名函式很常見，它會被當成其他函式或方法的引數，或用來建立物件中的函式特性。

函式運算式中，函式名稱是**選用的**...，當賦與函式名稱+將它指派給一個變數

```
const g = function f() {
  ...
}
```

當用這種方式建立函式，名稱g會被採用，要參考函式(從函式外面)，應使用g；當試著使用f，會看到未定義變數的錯誤。

如果想從函式裡面參考函式本身(遞迴)，就須採用這種作法：

```
const g = function f(stop) {
  if (stop) console.log('f stopped');
  f(true);
};
g(false);
```

## 箭頭標記法

箭頭標記法，也稱為肥箭頭(因為箭頭是等號而非破折號)。它是糖衣語法，減少輸入function這個字的次數，以及大括號的數量。

- 省略function字
- 如果函式只有一個引數，可省略括號
- 如果函式只有一個運算式，可以省略大括號與return陳述式

```
const f1 = () => "hello!";
const f2 = name => `Hello, ${name}!`;
const f3 = (a, b) => a + b;
```

需要一個有名稱的函式，可直接用一班的函式宣告方法；當要建立並傳遞匿名函式，箭頭函式最實用。

箭頭函式與一般函式最主要差異：this會用語彙(lexicallu)來綁定，與其他所有變數一樣。

```
const o = {
  name: 'Julie',
  greetBackWards: function() {
    const getReverseName = () => {
      let nameBackwards = '';
      for (let i = this.name.length - 1; i >= 0; i--) {
        nameBackwards += this.name[i];
      }
      return nameBackwards;
    }
    return `${getReverseName()} si eman ym, olleH`;
  },
};
o.greetBackWards();
```

箭頭函式與一般函式還有兩個細微區別：

- 它們不能當成物件建構式來使用
- 箭頭函式不能使用特殊的**arguments**變數(因有擴張運算子的關係，它已非必要了)

## call、apply與bind

已見過"常見"的綁定this方式。但JavaScript可讓你指定要綁定的東西，包括要如何呼叫函式，以及要呼叫哪裡的函式。

`call`，所有函式都可使用的方法，可讓你用特定的this值來呼叫函式。

```
const bruce = { name: "Bruce" };
const madeline = { name: "Madeline" };

function greet() {
  return `Hello, I'm ${this.name}!`;
}

greet();
greet.call(bruce);    // "Hello, I'm Bruce"
greet.call(madeline); // "Hello, I'm Madeline"
```