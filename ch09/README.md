# 物件與物件導向程式設計

JavaScript物件是一種**容器**(也稱**聚合**(aggregate)或**複合資料型態**(complex data types))。物件與陣列有兩個主要差異：

- 陣列儲存值、用數字索引；物件儲存特性，用字串或符號索引
- 陣列是有序的；物件不是

物件特性：

- **鍵**(字串或符號)
- **值**

物件與眾不同的地方在於，可用特性的**鍵**來存取它們

## 特性枚舉

僅列出容器內容(稱為枚舉)，需要的應該是陣列，而不是物件。但因物件是容器，且提供特性枚舉功能，所以須知道它涉及的複雜性。

特性枚舉，順序不保證對。

### for...in

傳統的物件特性枚舉方式，是使用`for...in`。

```
const SYM = Symbol();

const o = { a: 1, b: 2, c: 3, [SYM]: 4 };

for (let prop in o) {
  if (!o.hasOwnProperty(prop)) continue;
  console.log(`${prop}: ${o[prop]}`);
}
```

`hasOwnProperty`可以處理`for...in`迴圈的一個危險的地方：繼承而來的屬性。

留意`for...in`迴圈不包含使用符號鍵的特性。

`for...in`也可迭代陣列，但非好方法，比較建議用`for`迴圈或陣列的`forEach`。

### Object.keys

`Object.keys`可產生一個陣列，它裡面枚舉物件的所有字串特性：

```
const SYM = Symbol();
const o = { a: 1, b: 2, c: 3, [SYM]: 4 };
Object.keys(o).forEach(prop => console.log(`${prop}: ${o[prop]}`));
```

範例結果與`for...in`迴圈一樣(而且不需要檢查`hasOwnProperty`)。當需要陣列型式的物件特性鍵時，它很好用。

例如可輕鬆地列出所有以字母x開頭的物件特性：

```

```