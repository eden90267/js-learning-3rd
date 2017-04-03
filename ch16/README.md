# 數學

JavaScript內建的Math物件，裡面有開發應用程式時，經常會用到的數學函式。

JavaScript沒有專用的整數類別，所有數字都是IEEE 754 64位元浮點數字。可將JavaScript數字視為實數。JavaScript沒有內建的複數支援。如果需要複數、大數字，或較複雜的結構或演算法。可使用`Math.js`。

## 格式化數字

格式化數字是常見的功能，2.0093顯示成2.1。或將1949032顯示成1,949,032。

JavaScript內建的格式化數字功能有限，但也支援固定數字的十進位、固定精確度，與指數標記法。也可用其他的基數來顯示數字，例如二進位、八進位與十六進位。

JavaScript數字格式化方法都會回傳字串，只有字串可以保存你想要的格式。

### 固定小數

希望小數點後面的位數是固定的，可使用`Number.prototype.toFixed`：

```
const x = 19.51;
x.toFixed(3);    // "19.510"
x.toFixed(2);    // "19.51"
x.toFixed(1);    // "19.5"
x.toFixed(0);    // "20"
```

非捨去法，會是四捨五入到指定的小數位數。

### 指數標記法

可使用`Number.prototype.toExponential`

```
const x = 3800.5;
x.toExponential(4);  // "3.8005e+3"
x.toExponential(3);  // "3.801e+3"
x.toExponential(2);  // "3.80e+3"
x.toExponential(1);  // "3.8e+3"
x.toExponential(0);  // "4e+3"
```

輸入是四捨五入，指定的精確度，就是小數點後的位數。

### 固定精確度

固定位數，可使用`Number.prototype.toPrecision`

```
let x = 1000;
x.toPrecision(5);  // "1000.0"
x.toPrecision(4);  // "1000"
x.toPrecision(3);  // "1.00e+3"
x.toPrecision(2);  // "1.0e+3"
x.toPrecision(1);  // "1e+3"
x = 15.335
x.toPrecision(6);  // "15.3350"
x.toPrecision(5);  // "15.335"
x.toPrecision(4);  // "15.34"
x.toPrecision(3)   // "15.3"
x.toPrecision(2)   // "15"
x.toPrecision(1)   // "2e+1"
```

輸出是四捨五入，指定的精確度位數。必要時，輸出是指數標記法。

### 不同的基數

想用不同基數來顯示數字(例如二進位、八進位，或十六進位)，可透過Number.prototype.toString傳入一個引數來指定基數

```
const x = 12;   // undefined
x.toString();   // "12"
x.toString(10); // "12"
x.toString(16); // "c"
x.toString(8);  // "14"
x.toString(2);  // "1100"
```

### 進階數字格式化

如果你需要在應用程式中顯示許多數字，JavaScript方法可能無法滿足你的需求。常見的需求有：

- 千位分隔符號
- 以不同的方式來顯示負數
- 工程符號
- 前置SI(milli-、micro-、kilo-、mega-)

推薦使用`Numeral.js`，它具備以上所有功能，還有其他功能。

## 常數

可透過Math取得常用的常數

```
// 基本常數
> Math.E           // 自然對數的根
2.718281828459045
> Math.PI          // 圓周率
3.141592653589793

// 對數常數
> Math.LN2         // 2的自然對數
0.6931471805599453
> Math.LN10        // 10的自然對數
2.302585092994046
> Math.LOG2E       // Math.E的基數2對數
1.4426950408889634
> Math.LOG10E      // Math.E的基數10對數
0.4342944819032518

// 代數常數
> Math.SQRT1_2     // 1/2的平方根
0.7071067811865476
> Math.SQRT2       // 2的平方根
1.4142135623730951
```

## 代數函數

### 乘冪

- Math.pow(x, y)

    ```
    > Math.pow(2,3)
    8
    > Math.pow(1.7, 2.3)
    3.388695291147646
    ```

- Math.sqrt(x)：平方根

    ````
    > Math.sqrt(16)
    4
    > Math.sqrt(15.5)
    3.9370039370059056
    ````

- Math.cbrt(x)：x的立方根

    ```
    > Math.cbrt(27)
    3
    > Math.cbrt(22)
    2.8020393306553872
    ```
    
- Math.exp(x)

    ```
    > Math.exp(1)
    2.718281828459045
    > Math.exp(5.5)
    244.69193226422038
    ```

- Math.expm1(x)：相當於Math.exp(x) - 1

    ```
    > Math.expm1(1)
    1.718281828459045
    > Math.expm1(5.5)
    243.69193226422038
    ```
    
- Math.hypot(x1, x2,...)：引數平方和的平方根

    ```
    > Math.hypot(3, 4)
    5
    > Math.hypot(2, 3, 4)
    5.385164807134504
    ```
    
### 對數函數

基本的對數函數：Math.log，ES6有加入Math.log10：log基數10。

- Math.log(x)
- Math.log10(x)
- Math.log2(x)
- Math.log1p(x)

### 其他

- Math.abs(x)：x的絕對值

    ```
    > Math.abs(-5.5)
    5.5
    > Math.abs(5.5)
    5.5
    ```
    
- Math.sign(x)：x的符號：x是負數，它是-1；x是正數，它是1；x是0，它是0

    ```
    > Math.sign(-10.5)
    -1
    > Math.sign(6.77)
    1
    ```
    
- Math.ceil(x)：大於或等於x的最小整數

    ```
    > Math.ceil(2.2)
    3
    > Math.ceil(-3.8)
    -3
    ```
    
- Math.floor：小於或等於x的最大整數

    ```
    > Math.floor(2.8)
    2
    > Math.floor(-3.2)
    -4
    ```
    
- Math.trunc(x)：x的整數部分

    ```
    > Math.trunc(7.7)
    7
    > Math.trunc(-5.8)
    -5
    ```
    
- Math.round(x)：x被四捨五入成最接近的整數

    ```
    > Math.round(7.2)
    7
    > Math.round(7.7)
    8
    > Math.round(-7.7)
    -8
    > Math.round(-7.2)
    -7
    ```
    
- Math.min(x1, x2,...)：回傳最小的引數

    ```
    > Math.min(1,2)
    1
    > Math.min(3,0.5,0.66)
    0.5
    > Math.min(3,0.5,-0.66)
    -0.66
    ```
    
- Math.max(x1, x2,...)：回傳最大的引數

    ```
    > Math.max(1, 2)
    2
    > Math.max(3, 0.5, 0.66)
    3
    > Math.max(-3, 0.5, 0.66)
    0.66
    ```

### 產生偽變數

Math.random，它會回傳一個大於或等於0，且小於1的亂數。

Math.random回傳的數字是在`[0, 1)`範圍內。(代數數字範圍：`[`、`]`包含；`(`、`)`不包含)

以下是提供不同範圍的整數：

| 範圍           | 範例                                |
|----------------|-------------------------------------|
| [0, 1)         | Math.random()                       |
| [x, y)         | x+(y-x)*Math.random()               |
| [m, n)內的整數 | m+Math.floor((n-m)*Math.random())   |
| [m, n]內的整數 | m+Math.floor((n-m+1)*Math.random()) |

JavaScript的偽亂數產生器，無法提供**種子**，這對測試偽亂數的演算法來說很重要。如果需要可用`seedrandom.js`套件。

## 三角函式

可用正弦、餘弦、正切與它們的相反。Math的所有三角函式都使用弧度，不是角度

- Math.sin(x)

    ```
    > Math.sin(Math.PI/2)
    1
    > Math.sin(Math.PI/4)
    0.7071067811865475
    ```

- Math.cos(x)
- Math.tan(x)
- Math.asin(x)
- Math.acos(x)
- Math.atan(x)
- Math.atan2(y, x0)

如果你用的是角度，就必須轉換成弧度：除以180，再乘以π。

```
function deg2rad(d) { return d/180*Math.PI; }
function rad2deg(r) { return r/Math.PI*180; }
``` 

## 雙曲函式

- Math.sinh(x)
- Math.cosh(x)
- Math.tanh(x)
- Math.asinh(x)
- Math.acosh(x)
- Math.atanh(x)

