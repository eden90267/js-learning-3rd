# 物件特性設置與代理器

## 存取特性：Getter與Setter

物件的特性有兩種：**資料特性**與**存取器特性**。存取器特性被隱藏在一些ES6語法糖果。

函式特性與存取器特性很像，但他們有兩種函式：`getter`與`setter`。當使用時會比較像資料特性。

```
const USER_EMAIL = Symbol();
class User {
    setEmail(value) {
        if (!/@/.test(value)) throw new Error(`Invalid email: ${value}`);
        this[USER_EMAIL] = value;
    }
    getEmail() {
        return this[USER_EMAIL];
    }
}
```

使用兩個方法(而非特性)，是防止USER_EMAIL特性接收一個無效的email地址。我們在這使用一個Symbol特性，是避免不小心直接存取特性。

以下是這個類別的使用範例(但比想像拙劣)：

```
const u = new User();
u.setEmail("john@doe.com");
console.log(`User email: ${u.getEmail()}`);
```

雖它可動作，但這樣寫比較自然：

```
const u = new User();
u.email = "john@doe.com";
console.log(`User email: ${u.email}`);
```

使用存取器特性：可取得前者的好處，並使用後者的自然語法。

```
const USER_EMAIL = Symbol();
class User {
    set email(value) {
        if (!/@/.test(value)) throw new Error(`Invalid email: ${value}`);
        this[USER_EMAIL] = value;
    }
    get email() {
        return this[USER_EMAIL];
    }
}
```

你可以只提供getter，而不提供setter，例如，考慮一個提供矩形周長的getter：

```
class Rectangle {
    constructor(width, height) {
        this.width = width;
    }
    get perimeter() {
        return this.width * 2 + this.height * 2;
    }
}
```

不提供周長的setter，因為你無法篤定地用周長來推算矩形的寬與高。

也可只提供setter，但很少見。

## 物件特性屬性

有些特性具有**屬性**，這些屬性可控制特性在它們所屬的物件環境中的行為。使用`Object.getOwnPropertyDescriptor`來檢視它的屬性：

```
const obj = { foo: 'bar' };
console.log(Object.getOwnPropertyDescriptor(obj, 'foo'));
```

回傳以下結果：

```
{ value: 'bar',
  writable: true,
  enumerable: true,
  configurable: true }
```

這說明特性有三種屬性：

- 可寫性

    控制特性的值是否可變更

- 可枚舉性

    當你枚舉物件特性(`for...in`，`Object.keys`或擴張運算子)，控制該特性會不會納入枚舉

- 可設定性

    控制你是否可在物件中刪除該特性，或修改它的屬性
    
    
可用`Object.defineProperty`來控制特性屬性，你可用它來建立新的特性，或修改既有的特性(只要該特性可設定)。

```
const obj = { foo: 'bar' };
Object.defineProperty(obj, 'foo', {writable: false});
console.log(Object.getOwnPropertyDescriptor(obj, 'foo'));

obj.foo = 3;
console.log(`obj.foo: ${obj.foo}`); // 賦值不會成功；嚴格模式下會報TypeError錯誤。
```

也可使用`Object.defineProperty`來將新特性加到物件。這對屬性特性特別實用，因為與資料特性不同的是，我們無法在物件建立後加入存取器特性。

```
Object.defineProperty(obj, 'color', {
    get: function() { return this.color; },
    set: function(value) { this.color = value; }
});
```

建立資料特性，要加`value`特性提供給`Object.defineProperty`。

```
Object.defineProperty(obj, 'name', {
    value: 'Cynthia',
});
Object.defineProperty(obj, 'greet', {
    value: function() { return `Hello, my name is ${this.name}!`; }
});
```

Object.defineProperty經常用來讓特性在陣列中無法枚舉。之前提過，在陣列中使用字串或符號特性是不智的作法(因與陣列用法衝突)，但如果小心且考慮周到使用，它會很實用。我們也不鼓勵在陣列中使用`for...in`或`Object.keys`(應使用`for`、`for...of`或`Array.prototype.forEach`)，但你無法防止別人做這種事。因此如果你在陣列中加入非數值特性，應將它們設為不可枚舉。

```
const arr = [3, 1.5, 9, 2, 5.2];
arr.sum = function () { return this.reduce((a, x) => a += x); }
arr.avg = function () { return this.sum() / this.length };
Object.defineProperty(arr, 'sum', { enumerable: false });
Object.defineProperty(arr, 'avg', { enumerable: false });
```

可以一個特性一個特性地做：

```
const arr = [3, 1.5, 9, 2, 5.2];
Object.defineProperty(arr, 'sum', {
    value: function () { return this.reduce((a, x) => a += x) },
    enumerable: false
});
Object.defineProperty(arr, 'avg', {
    value: function () { return this.sum / this.length },
    enumerable: false
});
```

最後，還有一個`Object.defineProperties`，可接收一個可將特性名稱對應至特性定義的物件。

```
const arr = [3, 1.5, 9, 2, 5.2];
Object.defineProperties(arr, {
    sum: {
        value: function() { return this.reduce((a, x) => a+=x); },
        enumerable: false
    },
    avg: {
        value: function() { return this.sum / this.length },
        enumerable: false
    }
});

console.log(arr.sum());
console.log(arr.avg());
```

## 保護物件：凍結、封存與防止擴展

JavaScript提供三種機制來防止不小心修改程式(並且讓刻意的修改更困難)：凍結、封存與防止擴展。

凍結可防止對某個物件作**所有**改變，當凍結物件，就無法：

- 設定該物件的特性的值
- 呼叫可修改該物件的特性值的方法
- 呼叫該物件的setter
- 添加新特性
- 添加新方法
- 改變既有的特性或方法的設定

凍結物件，就是讓它無法被改變。最適合只含有資料的物件。

Object.freeze(可呼叫Object.isFrozen得知一個物件是否已被凍結)。想像你用物件來儲存程式的不變資訊：

```
'use strict'

const appInfo = {
    company: 'White Knight Software, Inc.',
    version: '1.3.5',
    buildId: '0a995448-ead4-4a9b-b050-9c9083279ea2',
    copyright() {
        return `@ ${new Date().getFullYear()}, ${this.company}`;
    }
}

Object.freeze(appInfo);
Object.isFrozen(appInfo);  // true

appInfo.newProp = 'test';
// TypeError: Can't add property newProp, object is not extensible

delete appInfo.company;
// TypeError: Cannot delete property 'company' of #<Object>

appInfo.company = 'test';
// TypeError: Cannot assign to read only property 'company' of object '#<Object>'

Object.defineProperty(appInfo, 'company', { enumerable: false });
// TypeError: Cannot redefine property: company
```

封裝物件可防止它被加入新特性，或既有的特性被重新設定或移除。封存可用於類別的實例，因為操作物件特性的方法仍可生效(只要不試著重新設定特性)。可以用`Object.seal`來封存物件，及呼叫`Object.isSealed`來得知一個物件是否已被封存。

```
'use strict'

class Logger {
    constructor(name) {
        this.name = name;
        this.log = [];
    }
    add(entry) {
        this.log.push({
            log: entry,
            timestamp: Date.now()
        });
    }
}

const log = new Logger("Captain's Log");
Object.seal(log);
Object.isSealed(log);  // true

log.name = "Captain's Boring Log";
log.add("Another boring day at sea...");

log.newProp = 'test';
// TypeError: Can't add property newProp, object is not extensible

delete log.name;
// TypeError: Cannot delete property 'name' of #<Logger>

Object.defineProperty(log, 'log', { enumerable: false });
// TypeError: Cannot redefine property: log
```

最後是最弱的保護機制，它讓物件無法被擴展，只會防止物件被加入新特性，它的特性仍可以被賦值、刪除與重新設定。`Object.preventExtensions`與`Object.isExtensible`：

```
'use strict'

class Logger {
    constructor(name) {
        this.name = name;
        this.log = [];
    }
    add(entry) {
        this.log.push({
            log: entry,
            timestamp: Date.now()
        });
    }
}

const log = new Logger("First Mate's Log");
Object.preventExtensions(log);
Object.isExtensible(log);      // true

log.name = "First Mate's Boring Log";
log.add("Another boring day at sea...");

// log.newProp = "test";
// TypeError: Can't add property newProp, object is not extensible

delete log.name;

Object.defineProperty(log, 'log', { enumerable: false });
```

自己不常使用Object.preventExtensions。如果想要防止一個物件被擴展，通常也會想要防止它被刪除及重新設定，所以通常會選擇封存物件。

保護物件選項：

| 動作       | 一般物件 | 被凍結的物件 | 被封存的物件 | 不可擴展的物件 |
|------------|----------|--------------|--------------|----------------|
| 添加特性   | 可       | 不可         | 不可         | 不可           |
| 讀取特性   | 可       | 可           | 可           | 可             |
| 設定特性值 | 可       | 不可         | 可           | 可             |
| 設定特性   | 可       | 不可         | 不可         | 可             |
| 刪除特性   | 可       | 不可         | 不可         | 可             |

## 代理

**代理**是ES6新功能，它提供額外的中繼編程功能(中繼編程是可讓程式修改自己的能力)。

物件代理基本上有能力解譯與(可選)修改物件的動作。從一個簡單範例開始：修改特性存取。

```
function evaluate(x, c) {
    return c.a + c.b * x + c.c + Math.pow(x, 2);
}

const coefficients = {
    a: 1,
    c: 3,
}

evaluate(5, coefficients); // NaN
```

傳入的參數缺少一些係數。我們可將`coefficients.b`設為0來解決這個問題，但代理提供一個更好的選項。因為代理可以**解譯物件的動作**，我們可確保未定義的特性會回傳0值。來建立一個coefficients物件的代理：

```
const betterCoefficients = new Proxy(coefficients, {
    get(target, key) {
        return target[key] || 0;
    }
});
```

※ Babel還沒提供代理。但Firefox支援它們。

Proxy建構式的第一個引數是**目標**，或被代理的物件。第二個引數是**處理器**，指定要攔截的動作。在這裡我們攔截特性存取，以`get`函式來表示(這與`get`特性存取器不同：這可處理一般的特性**與**get處理器)。`get`函式有三個引數：**目標**、**特性鍵**(字串或符號)與**接收器**(代理本身，或由它延伸的東西)。

```
betterCoefficients.b;        // 0
betterCoefficients.d;        // 0
betterCoefficients.anything; // 0
```

可以來只代理一個小寫字母：

```
const betterCoefficients = new Proxy(coefficients, {
    get(target, key) {
        if (!/^[a-z]$/.test(key)) return target[key];
        return target[key] || 0;
    }
});
```

同樣的，也可攔截被`set`處理器設定的特性(或存取器)。考慮一個例子，它的物件有些危險的特性，想要避免這些特性被設定，以及方法被呼叫，但不使用額外的步驟。我們會使用的額外步驟是用一個setter，稱為allowDangerousOperations，你必須在存取危險的功能之前，先將它設為true：

```
const cook = {
    name: "Walt",
    redPhosphorus: 100,  // 危險
    water: 500,          // 安全
};
const protectedCook = new Proxy(cook, {
    set(target, key, value) {
        if (key === 'redPhosphorus') {
            if (target.allowDangerousOperations)
                return target.redPhosphorus = value;
            else
                return console.log("Too dangerous!");
        }
        target[key] = value;
    }
});

protectedCook.water = 550;
protectedCook.redPhosphorus = 150; // Too dangerous!

protectedCook.allowDangerousOperations = true;
protectedCook.redPhosphorus = 150; // 150
console.log(protectedCook.redPhosphorus);
```

