# 陣列與陣列處理

JavaScript流暢的陣列方法可以輕鬆處理資料集合的問題。

## 回顧陣列

- 本質上有序
- 索引從零開始
- 元素可非同型
- 常值陣列用方括號建構
- 可用方括號與索引來存取元素
- 陣列有length特性
- 陣列會自動變大
- 未使用的索引會有undefined值
- 可使用Array建構子來建構陣列(不常見)

```
// 陣列常值
const arr1 = [1, 2 ,3];
const arr2 = ["one", 2, "three"];
const arr3 = [[1 ,2, 3], ["one", 2, "three"]];
const arr4 = [
  {name: "Fred", type: "object", luckyNumbers: [5, 7, 13]},
  [
    {name: "Susan", type: "object"},
    {name: "Anthony", type: "object"}
  ],
  1,
  function() {return "arrays can contain functions too";},
  "three",
];

// 存取元素
arr1[0];
arr1[2];
arr3[1];
arr4[1][0];

// 陣列長度
arr1.length;
arr4.length;
arr4[1].length;

// 增加陣列大小
arr1[4] = 5;
arr1;
arr1.length;

// 存取(不是指派)比陣列大的索引，"不會"改變陣列大小
arr2[10];
arr2.length;

// Array建構式(很少用)
const arr5 = new Array();        // 空陣列
const arr6 = new Array(1, 2, 3); // [1, 2, 3]
const arr7 = new Array(2);       // 長度為2的陣列(all元素都是undefined)
const arr8 = new Array("2");     // ["2"]
```

## 操作陣列內容

陣列方法之所以讓人難懂，有一個原因是"就地"修改陣列的方法與回傳新陣列的方法之間的差異。這沒有一定規則，這是唯一需要記的東西。(e.g. `push`會就地修改陣列，但`concat`會回傳一個新陣列)。

### 在開頭或結尾處添加或移除一個元素

- `push`與`pop`：陣列結尾加入與移除(就地)元素。
- `shift`與`unshift`：陣列開頭移除與加入(就地)元素。

這些方法名稱來自電腦科學術語。`push`與`pop`是針對**堆疊**做的動作，堆疊中，最重要的元素是最後被加入的那一個。`shift`與`unshift`是將陣列視為**佇列**，佇列最重要的元素是最早被加入的那一個。

`push`與`unshift`會在加入新元素之後回傳陣列的**最新長度**，而`pop`與`shift`會回傳**被移除的元素**。

```
const arr = ["b", "c", "d"];
arr.push("e");    // 4
arr.pop();        // "e"
arr.unshift("a"); // 4
arr.shift();      // "a"
```

### 在結尾處加入多個元素

`concat`方法可在結尾處加入多個元素，並**回傳複本**。如果你將陣列傳入`concat`，**它會拆開這些陣列**，並將他們的元素加入原本的陣列。

```
const arr = [1, 2, 3];
arr.concat(4, 5, 6);    // [1, 2, 3, 4, 5, 6]，arr未被修改
arr.concat([4, 5, 6]);  // [1, 2, 3, 4, 5, 6]，arr未被修改
arr.concat([4, 5], 6);  // [1, 2, 3, 4, 5, 6]，arr未被修改
arr.concat([4, [5, 6]]);// [1, 2, 3, 4, [5, 6]]，arr未被修改
```

### 取得子陣列

如果想取得某個陣列的子陣列，可使用`slide`。`slide`有兩個引數：

- 子陣列開始的地方
- 子陣列結束的地方(不含指定字元)

如果忽略結束引數，它會回傳字串結尾之前的元素。這種方法可以負索引來指出從字串結尾算回去的元素。

```
const arr = [1, 2, 3, 4, 5];
arr.slice(3);      // [4, 5]; arr未被修改
arr.slice(2, 4);   // [3, 4]; arr未被修改
arr.slice(-2);     // [4, 5]; arr未被修改
arr.slice(1, -2);  // [2, 3]; arr未被修改
arr.slice(-2, -1); // [4]; arr未被修改
```

### 在任何位置加入或移除元素

`splice`，可**就地**修改字串，在任何索引加入或移除元素。

- 第一個引數：開始修改的索引
- 第二個引數：移除的元素數量(如果不想移除任何元素，就使用0)
- 其餘的引數是要加入的元素

```
const arr = [1, 5, 7];
arr.splice(1, 0, 2, 3, 4);  // 回傳[]; arr現在是[1, 2, 3, 4, 5, 7]
arr.splice(5, 0, 6);        // 回傳[]; arr現在是[1, 2, 3, 4, 5, 6, 7]
arr.splice(1, 2);           // 回傳[2, 3]; arr現在是[1, 4, 5, 6, 7]
arr.splice(2, 1, 'a', 'b'); // 回傳[5]; arr現在是[1, 4, 'a', 'b', 6, 7]
```

### 切割與替換陣列元素

ES6加入一種新方法：`copyWithin`，它會將陣列內一系列的元素**就地**複製到該陣列的其他地方，覆寫原本的元素。

- 第一個引數：是被貼上的地方(目標)
- 第二個引數：開始複製的地方
- 最後一個引數(選用)：停止複製的地方(不含指定的字元)

```
const arr = [1, 2, 3, 4];
arr.copyWithin(1, 2);      // [1, 3, 4, 4]
arr.copyWithin(2, 0, 2);   // [1, 3, 1, 3]
arr.copyWithin(0, -3, -1); // [3, 1, 1, 3]
```

### 在陣列中填入特定值

ES6加入一種受歡迎的新方法：`fill`，你可以用它來將任何數量的元素設為固定值(就地)。特別適合與Array建構式一起使用(可指定陣列的初始大小)。若只想要填入部分的陣列，可視情況指定開始與結束索引(負引數同樣有效)。

```
const arr = new Array(5).fill(1); // [1, 1, 1, 1, 1]
arr.fill("1");                    // ["a", "a", "a", "a", "a"]
arr.fill("b", 1);                 // ["a", "b", "b", "b", "b"]
arr.fill("c", 2, 4);              // ["a", "b", "c", "c", "b"]
arr.fill(5.5, -4);                // ["a", 5.5, 5.5, 5.5, 5.5]
arr.fill(0, -3, -1);              // ["a", 5.5, 0, 0, 5.5];
```

### 反轉與排序陣列

`reverse`很容易理解，他會**就地**反轉陣列的順序：

```
const arr = [1, 2, 3, 4, 5];
arr.reverse();               // 現在arr是[5, 4, 3, 2, 1]
```

`sort`會**就地**排序陣列。

```
const arr = [5, 3, 2, 4, 1];
arr.sort();                  // 現在arr是[1, 2, 3, 4, 5]
```

也可以指定一個方便的排序函式。例如，排序物件沒有任何意義：

```
const arr = [
    {name: "Suzanne"}, {name: "Jim"}, {name: "Trevor"}, {name: "Amanda"}
];
arr.sort();
arr.sort((a, b) => a.name > b.name);
arr.sort((a,b ) => a.name[1] < a.name[1]); // 按照name特性的第二個字母反向排序
```

sort可接收數字回傳值。

## 搜尋陣列

- `indexOf`：尋找第一個完全符合的元素，並回傳它的索引。(`lastIndexOf`是從另一方向搜尋)。如果只想搜尋部分的陣列，可以指定開始的索引。如果回傳-1，代表沒找到符合的元素。

```
const o = {name: "Jerry"};
const arr = [1, 5, "a", o, true, 5, [1, 2], "9"];
arr.indexOf(5);               // 1
arr.lastIndexOf(5);           // 5
arr.indexOf("a");             // 2
arr.lastIndexOf("a");         // 2
arr.indexOf({name: "Jerry"}); // -1
arr.indexOf(o);               // 3
arr.indexOf([1, 2]);          // -1
arr.indexOf("9");             // 7
arr.indexOf(9);               // -1

arr.indexOf("a", 5);          // -1
arr.indexOf(5, 5);            // 5
arr.lastIndexOf(5, 4);        // 1
arr.lastIndexOf(true, 3);     // -1
```

接下來是`findIndex`，他也是回傳索引(or -1)。但他可提供一個判斷元素是否符合條件的函式，不過就無法從任意的索引開始，`lastFindindex`也一樣。

```
const arr = [{id: 5, name: 'Judith'}, {id: 7, name: 'Francis'}];
arr.findIndex(o => o.id === 5);           // 0
arr.findIndex(o => o.name === 'Francis'); // 1
arr.findIndex(o => o === 3);              // -1
arr.findIndex(o => o.id === 17);          // -1
```

若不care索引，反要元素本身？`find`，也可指定函式來找想找的東西，若找不到元素，則回傳`null`。

```
const arr = [{id: 5, name: 'Judith'}, {id: 7, name: 'Francis'}];
arr.find(o => o.id === 5); // {id: 5, name: 'Judith'}
arr.find(o => o.id === 2); // null
```

`find`與`findIndex`的被傳入函式

- 第一個引數：接收元素
- 第二個引數：目前元素的索引
- 第三個引數：整個陣列本身

找出平方值：

```
const arr = [1, 17, 16, 5, 4, 16, 10, 3, 49];
arr.find((x, i) => i > 2 && Number.isInteger(Math.sqrt(x))); // 4
```

find與findIndex也可以指定this變數在呼叫函式過程中的值。如果你想呼叫一個函式，就像它是個物件的方法。

```
class Person {
    constructor(name) {
        this.name = name;
        this.id = Person.nextId++;
    }
}

Person.nextId = 0;
const jamie = new Person("Jamie"),
    juliet = new Person("Juliet"),
    peter = new Person("Peter"),
    jay = new Person("Jay");
const arr = [jamie, juliet, peter, jay];

// 選項1：直接比較ID
arr.find(p => p.id === juliet.id); // {name: "Juliet", id: 1}

// 選項2：使用“this”引數
arr.find((p) => p.id === this.id, juliet); // 回傳undefined
// arrow function會自動綁定this(這裡是window物件)，導致失效，所以改寫以下正常：
arr.find(function(p) { return p.id === this.id; }, juliet); // {name: "Juliet", id: 1}
```

不在乎陣列的元素索引，也不在乎索引或元素本身，只想知道它是否存在。顯然可使用之前的函式來檢查它會回傳-1或null，看JavaScript提供兩個程式做這件事：`some`與`every`

`some`找到第一個，就不找了，回傳true否false：

```
const arr = [5, 7, 12, 15, 17];
arr.some(x => x%2===0);                        // true，12是偶數
arr.some(x => Number.isInteger(Math.sqrt(x))); // false，沒有平方值
```

如果陣列每一個元素都符合條件，`every`會回傳true，否則false。`every`有一個false就會停止。

```
const arr = [4, 6, 16, 36];
arr.every(x => x%2===0);                        // true
arr.every(x => Number.isInteger(Math.sqrt(x))); // false，6不是平方數
```

`find`、`findIndex`、`some`、`every`都可接受第二個引數，可指定函式被呼叫時，`this`的值為何。

## 基本陣列操作：map與filter

在所有陣列操作中，做實用的是`map`與`filter`。

`map`可**轉換**陣列元素。**如果你的陣列屬於某一種格式，但你需要另一種格式，可使用map**。`map`與`filter`都會回傳複本，不會修改原始陣列。

```
const cart = [{name: "Widget", price: 9.95}, {name:"Gadget", price: 22.95}];
const names = cart.map(x => x.name);           // ["Widget", "Gadget"]
const prices = cart.map(x => x.price);         // [9.95, 22.95]
const discountPrices = prices.map(x => x*0.8); // [7.96, 18.36]
const lcNames = names.map(String.toLowerCase); // error，要用以下的方式處理
// names.map(Function.prototype.call, String.prototype.toLowerCase);
// map(callback, thisArgs)
```