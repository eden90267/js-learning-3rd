前面待捕....

### 取得子陣列

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


