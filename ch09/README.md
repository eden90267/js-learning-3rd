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
const o = { apple: 1, xochitl: 2, balloon: 3, guitar: 4, xylophone: 5 };
Object.keys(o)
  .filter(prop => prop.match(/^x/))
  .forEach(prop => console.log(`${prop}: ${o[prop]}`));
```

## 物件導向程式設計

OOP的基本概念簡單又直接：物件是一種**在邏輯上與一群資料及功能有關的東西**，它的設計，是為了對應我們對這個世界的理解方式。

車子

- 資料：製造者、型號、車門數量、車牌號碼
- 功能：加速、檔位、開門、打開車頭燈

OOP可讓你用抽象(車)與具體(**特定**的車)的方式來思考。

OOP基本詞彙：

- 類別：代表一種**統稱**的東西
- 實例：代表**特定**的東西
- 功能：稱為方法
- 類別方法：與類別有關的方法，但**不屬於特定的實例**

第一次建立實例，會執行它的**建構式**，建構式會將物件實例初始化。

OOP也提供一個以**階層**來分類類別的框架。例如，可建立一個更通用的vehicle(**交通工具**)類別。車輛可能會有**最長行駛距離(range)**，與車子不同的是，它可能沒有輪子(e.g. 船)。我們說交通工具是車子的**超類別**，車子是交通工具的**子類別**。

### 建立類別與實例

ES6之前，JavaScript建立類別是一種模糊、難懂的工作。ES6加入方便的類別建立語法：

```
class Car {
  constructor() {
  }
}
```

建立具體的車子，需使用`new`關鍵字：

```
const car1 = new Car();
const car2 = new Car();
```

`instanceof`運算子，可以告訴你某個物件是不是屬於某類別的實例：

```
car1 instanceof Car    // true
car2 instanceof Array  // false
```

```
class Car {
  constructor(make, model) {
    this.make = make;
    this.model = model;
    this.userGears = ['P', 'N', 'R', 'D'];
    this.userGear = this.userGears[0];
  }
  shift(gear) {
    if (this.userGears.indexOf(gear) < 0)
      throw new Error(`Invalid gear: ${gear}`);
    this.userGear = gear;
  }
}
```

`this`：參考被呼叫的方法所屬的實例。可想成一個**預留項目**：當你編寫一個類別(抽象)，`this`關鍵字是**特定**實例的預留符號，當方法被呼叫時，它的身份就可以確定。

```
const car1 = new Car("Tesla", "Model S");
const car2 = new Car("Mazda", "3i");
car1.shift('D');
car2.shift('R');

car1.userGear; // "D"
car2.userGear; // "R"
```

### 動態特性

讓Car類別的shift方法有能力防止無效的檔位設置是一種聰明的做法。大多數OO有提供保護機制，可讓你指定方法與特性的存取等級，來避免濫用。JavaScript沒有這種機制。

**動態特性**可減緩這種弱點。可讓特性具有方法的功能。

```
class Car {
    constructor() {
        this.make = make;
        this.model = model;
        this._userGears = ['P', 'N', 'R', 'D'];
        this._userGear = this._userGears[0];
    }

    get userGear() {
        return this._userGear;
    }
    set userGear(value) {
        if (this._userGears.indexOf(value) < 0)
            throw new Error(`invalid gear: ${value}`);
        this._userGear = value;
    }

    shift(gear) {
        this.userGear = gear;
    }
}
```

做到的是**慣用範例**的保護，讓你的程式中快速看到不應該存取的特性。

如果真的需要強制私用，可使用以範圍來保護的`WeakMap`實例。

```
const Car = (function () {
    
    const carProps = new WeakMap();

    class Car {
        constructor(make, model) {
            this.make = make;
            this.model = model;
            this._userGears = ['P', 'N', 'R', 'D'];
            carProps.set(this, { userGear: this._userGears[0] });
        }

        get userGear() {
            return carProps.get(this);
        }
        set userGear(value) {
            if (this._userGears.indexOf(value) < 0)
                throw new Error(`Invalid gear: ${value}`);
            carProps.get(this).userGear = value;
        }

        shift(gear) {
            this.userGear = gear;
        }
    }

    return Car;
})();
```

使用立即呼叫的函式運算式，將`WeakMap`藏一個`closure`裡面，讓它不被外面的世界存取。

### 類別即函式

`class`語法只是加入一些糖衣語法，JavaScript類別的性質並沒有改變。

類別其實是一種函式。ES5可這樣製作Car：

```
function Car(make, model) {
  this.make = make;
  this.model = model;
  this._userGears = ['P', 'N', 'R', 'D'];
  this._userGear = this._userGears[0];
}
```

確認`class`是糖衣語法：

```
class Es6Car {}
function Es5Car() {}
typeof Es6Car; // "function"
typeof Es5Car; // "function"
```

### 原型

當你參考類別的實例方法時，你參考的其實是**原型**(prototype)方法。

```
Car.prototype.shift;
Array.prototype.forEach;
```

每種**函式**都有一種特殊特性，叫做`prototype`。一般函式不會用到原型，但它對扮演物件建構式的函式而言非常重要。

新建立的物件可以存取它的建構式的`prototype`物件。物件實例會將它存在它的`__proto__`特性裡面。

`__proto__`特性被視為JavaScript管路系統之一，所有前後使用雙底線的特性都是如此。沒有非常暸解JavaScript之前，建議看看特性就好，不要碰。

關於原型，有一重要機制：動態指派(“指派”是呼叫方法的另一種說法)。存取某物件的特性或方法，如果不存在，**JavaScript就會檢查物件的原型**，看他有沒有在那裡。

同一類別的所有實例都會使用同一原型，若原型有特性與方法，該類別所有實例都可存取。

在類別的原型中設定資料特性通常沒效果。任何實例去更改原型的資料特性，那個值會設為實例的值，而非原型。這會有困擾與bug。如果想讓所有實例都有一個初始的資料值，最好在建構式中設定它們。

注意，在實例中定義方法或特性，將會改寫原型的版本。JavaScript先檢查實例再原型。

```
const car1 = new Car();
const car2 = new Car();

car1.shift === Car.prototype.shift; // true
car1.shift('D');
car1.shift('d');                    // 錯誤
car1.userGear;                      // 'D'
car1.shift = car2.shift;            // true

car1.shift = function(gear) {
    this.userGear = gear.toUpperCase();
}
car1.shift === Car.prototype.shift; // false
car1.shift === car2.shift;          // false
car1.shift('d');
car1.userGear;                      // 'D'
```

### 靜態方法

