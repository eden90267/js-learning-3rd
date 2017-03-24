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