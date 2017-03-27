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

### map

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


使用既有的函式`String.toLowerCase`，該函式接收一個字串引數，並回傳小寫的字串。暸解”函式就是函式，無論它的形式為何“。

map傳入的函式被呼叫時，提供三個引數來處理元素：

- 元素本身
- 元素索引
- 陣列本身(很少用到)

兩個不同陣列結合：

```
const items = ["Widget", "Gadget"];
const prices = [9.95, 22.95];
const cart = items.map((x, i) => ({name: x, price: prices[i]}));
// cart: [{ name: "Widget", price: 9.95 }, { name: "Gadget", price: 22.95 }]
```

必須將return物件用括號包起來，不然arrow function會將大括號視為區塊標示。

### filter

移除陣列中不想要的東西。也是回傳一個已移除元素的新陣列。

```
const cards = [];
for (let suit of ['H', 'C', 'D', 'S'])
  for (let value=1; value<=13; value++)
    cards.push({suit, value});

// 取得所有數字2的牌
cards.filter(c => c.value === 2);

// 取得所有鑽石
cards.filter(c => c.suit === 'D');

// 取得所有臉牌
cards.filter(c => c.value > 10);

// 取得所有紅心臉牌
cards.filter(c => c.suit === 'H' && c.value > 10);
```

map與filter組合：

想用短字串來表示卡牌。用Unicode代表花色，並使用“A”、“J”、“Q”與“K”來代表ace與臉牌。

```
function cardToString(c) {
    const suits = { 'H': '\u2665', 'C': '\u2663', 'D': '\u2666', 'S': '\u2660' };
    const values = { 1: 'A', 11: 'J', 12: 'Q', 13: 'K' };
    for (let i = 2; i <= 10) values[i] = i;
    return values[c.value] + suits[c.suit];
}

// 取得所有數字2的牌
cards.filter(c => c.value === 2).map(cardToString); // ["2♥", "2♣", "2♦", "2♠"]

// 取得所有紅心臉牌
cards.filter(c => c.suit === 'H' && c.value > 10).map(cardToString); // ["J♥", "Q♥", "K♥"]
```

## 陣列魔法：reduce

所有陣列方法中，作者最喜歡的是`reduce`。

`map`會轉換陣列的每一個元素，但`reduce`會轉換整個陣列。

`reduce`通常會用來將陣列精簡為一個值，例如：加總陣列的數字，或計算平均值，都是將陣列精簡為一個值的方式。但，`reduce`提供的單值可以是物件或另一個陣列，所以`reduce`也有`map`與`filter`的功能(或討論過的所有其他陣列函式)。

`reduce`傳入的控制結果的函式：

- 第一個引數：**累加器**，陣列要被精簡的東西
- 第二、三、四個引數：目前的陣列元素、目前的索引、與陣列本身。

reduce除了接收回呼之外，也可接收(選用)**累加器的初始值**。

```
const arr = [5, 7, 2, 4];
const sum = arr.reduce((a, x) => a += x, 0); // 18
```

省略初始值，a的初始值就會是第一個元素值，然後使用**第二個**陣列元素來呼叫函式。

可看到它少一個步驟，但結果是一樣的。所以這有省略初始值的好處。

```
arr.reduce((a, x) => a += x);
```

`reduce`經常使用原子(atomic)值(數字或字串)當成累積器的值。但將物件當成累積器來使用是憂種非常強大的方法(且經常被忽視)。

e.g. 有字串陣列，而且想將字串分成字母陣列(A開頭單字、B開頭單字等等)，可使用物件：

```
const words = ["Beachball", "Rodeo", "Angel",
    "Aardvark", "Xylophone", "November", "Chocolate",
    "Papaya", "Uniform", "Joker", "Clover", "Bali"
];
const alphabetical = words.reduce((a, x) => {
	if (!a[x[0]]) a[x[0]] = [];
	a[x[0]].push(x);
	return a; // 記得回傳的值會被當成陣列的下一個元素的累積器
}, {});
```

e.g. 計算統計數據。若要計算資料集的平均值與變分：

```
const data = [3.3, 5, 7.2, 12, 4, 6, 10.3];
const stats = data.reduce((a, x) => {
	a.N++;
	let delta = x - a.mean;
	a.mean += delta/a.N;
	a.M2 += delta*(x - a.mean);
    return a;
}, {N:0, mean: 0, M2: 0});
if (stats.N > 2) {
	stats.variance = stats.M2 / (stats.N -1);
	stats.stdev = Math.sqrt(stats.variance);
}
```

可使用物件當累積器，因為需要多個變數(`mean`與`M2`；必要的話，我們可以使用索引引數(負一)來取代N)。

```
const words = ["Beachball", "Rodeo", "Angel",
    "Aardvark", "Xylophone", "November", "Chocolate",
    "Papaya", "Uniform", "Joker", "Clover", "Bali"
];
const longWords = words.reduce((a, w) => w.length>6?a+" "+w:a, "").trim();
// "Beachball Aardvark Xylophone November Chocolate Uniform"
```

下面為filter與join來取代reduce：

```
words.filter(x => x.length > 6).join(' ');
// "Beachball Aardvark Xylophone November Chocolate Uniform"
```

`reduce`的威力，在所有陣列方法中，他是最通用且最強大的一個。

## 陣列方法，與已被刪除或從未定義的元素

關於從未被定義或已經被刪除的元素，有一種Array行為經常會讓人犯錯。`map`、`filter`與`reduce`**不會為從未被賦值或已被刪除的元素呼叫函式**。

e.g. 在ES6之前，用下列方式初始化一個陣列：

```
const arr = Array(10).map(function(x) { return 5; });
```

arr仍然是個有10個元素的陣列，裡面全部都是`undefined`。

同樣，如果刪除一個陣列中間的元素，接著呼叫`map`，會得到一個有“洞”的陣列。

```
const arr = [1, 2, 3, 4, 5];
delete arr[2];
arr.map(x => 0); // [0, 0, undefined × 1, 0, 0]
```

實務上，這不太會造成問題，因為你使用的陣列裡面的元素通常都會被明確設定。(除非故意要在陣列中留下空隙，這很罕見，你不會對陣列使用`delete`)。

## 連接字串

將陣列元素的(字串)值串接成字串，並在他們之間使用分隔符號。`Array.prototype.join`可使用一個引數：分隔符號(如果省略，預設是逗號)，並回傳一個將元素連接在一起的字串(包括從未被定義與已刪除的元素，它會變成空字串；`null`與`undefined`也會變成空字串)：

```
const arr = [1, null, "hello", "world", true, undefined];
delete arr[3];
arr.join();       // "1,,hello,,true,"
arr.join('');     // "1hellotrue"
arr.join(' -- '); // "1 --  -- hello --  -- true -- "
```

Array.prototype.join可建立像HTML<ul>串列這類東西：

```
const attributes = ["Nimble", "Perceptive", "Generous"];
const html = '<ul><li>' + attributes.join('</li><li>') + '</li></ul>';
// html："<ul><li>Nimble</li><li>Perceptive</li><li>Generous</li></ul>"
```

## 總結：

接收函式的`Array.prototype`方法(`find`、`findIndex`、`some`、`every`、`map`、`filter`與`reduce`)，你提供的函式會針對陣列每一個元素接收下方表的引數：

### Array函式引數

| 方法       | 說明                                 |
|------------|--------------------------------------|
| 只限reduce | 累積器(初始值，或上一次呼叫的回傳值) |
| all        | 元素(目前元素的值)                   |
| all        | 目前元素的索引                       |
| all        | Array本身(很少用到)                  |

所有可接收函式的`Array.prototype`方法都可以接收一個`this`值(選用)，可在函式被呼叫時使用它，
來**將函式當成方法來呼叫**。


### 陣列內容操作

| 當你需要                 | 使用...                    | 就地或複製 |
|--------------------------|----------------------------|------------|
| 建立堆疊                 | push(回傳新長度)，pop      | 就地       |
| 建立佇列                 | unshift(回傳新長度)，shift | 就地       |
| 在結尾加入多個元素       | concat                     | 複製       |
| 取得子陣列               | slice                      | 複製       |
| 在任何位置加入或移除元素 | splice                     | 就地       |
| 在陣列內剪下並取代       | copyWithin                 | 就地       |
| 填充陣列                 | fill                       | 就地       |
| 反轉陣列                 | reverse                    | 就地       |
| 排序陣列                 | sort(傳入函式或自訂排序)   | 就地       |

### 陣列搜尋

| 當你想要知道/尋找                  | 使用...                            |
|------------------------------------|------------------------------------|
| 某個項目的索引                     | indexOf(簡單值)，findIndex(複雜值) |
| 某個項目的最後一個索引             | lastIndexOf                        |
| 項目本身                           | find                               |
| 陣列中是否有一個項目符合某種條件   | some                               |
| 陣列中的所有元素是否都符合某種條件 | every                              |

### 陣列轉換

| 當你想要...                    | 使用... | 就地或複製 |
|--------------------------------|---------|------------|
| 轉換陣列中的所有元素           | map     | 複製       |
| 刪除陣列中符合某些條件的元素   | filter  | 複製       |
| 將整個陣列轉換成另一種資料型態 | reduce  | 複製       |
| 將元素轉換成字串並接在一起     | join    | 複製       |
