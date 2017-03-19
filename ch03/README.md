# Chap 03. 常值、變數、常數與資料型態

## 基本型態與物件

六種基本型態：

- 數字
- 字串
- 布林
- Null
- undefined
- 符號

基本型態都是不可變的。所謂不可變不代表變數的內容不可改變，重點在於，變數保存的值被改變。多數情況這樣的區別是有學術性的。函式的部分會派上用場。

物件：

用來建構自訂資料結構。JavaScript有一些內建物件型態。

- Array
- Date
- RegExp
- Map 與 WeakMap
- Set 與 WeakSet

基本型態的數字、字串與布林都有對應的物件型態Number、String與Boolean。這些物件不儲存值(那是基本型態的工作)，而是提供它對應的基本型態的功能。

## 數字

電腦可準確表示一些數字，但有許多數字是近似值。e.g. π、1/3。

JavaScript使用稱為**IEEE-764雙準確度浮點數**(IEEE-764 double-precision floating-point)的格式，來代表實際數字的近似值。(double)

```
0.1 + 0.2 = 0.30000000000000004
```

這非JavaScript壞掉，只不過在有限的記憶體中，使用無限的近似值必然會發生的結果。

JavaScript的數字資料型別，**只有一種**。大部分語言都有多個整數型態與兩個以上的浮點數型態。所以對於需要快速計算整數，或講求固定準確度數字的精準程度情況，JavaScript不適用。

JavaScript認得四種型態的數字常值：十進位、二進位、八進位與十六進位。

使用十進位常值，你可以表示整數(沒有小數)、十進位數字與以十為底的指數標記法(科學技術法的縮寫)。此外，它會用特殊的值來代表無限大、負無限大，而不是使用數字(技術上，它們不是數字常值，但他們會產生數字值)。

```
let count = 10; // 整數常值：count仍然是個double
count blue = 0x0000ff; // 十六進位(十六進位的ff = 十進位的255)
count umask = 0o0022; // 八進位(八進位的22 = 十進位的18)
const roomTemp = 21.5; // 十進位
const c = 3.0e6; // 指數(3.0 * 10^6 = 3,000,000)
const e = -1.6e-19; // 指數(-1.6 * 10^-19 = 0.00000000000000000016)
const inf = Infinity;
const ninf = -Infinity;
const nan = Nan; // "not a number"(非數字)
```

無論用哪種常值格式(十進位、十六進位、指數等等)，被建立出來的數字都會用一種格式來儲存：double。

無窮大與NaN，他們都不是可以拿來計算的數字，他們都會被當成佔位項(placeholders)來使用。

此外，他們對應的Number物件也有一些好用的特性，可代表重要的數字值。

```
const small = Number.EPSILON;           // 可加1來得到大於1的獨特數字的最小值，
                                        // 大約是2.2e-16
const bigInt = Number.MAX_SAFE_INTEGER; // 可表示的最大整數
const max = Number.MAX_VALUE;           // 可表示的最大數
const minInt = Number.MIN_SAFE_INTEGER; // 可表示的最小整數
const min = Number.MIN_VALUE;           // 可表示的最小數
const nInf = Number.NEGATIVE_INFINITY;  // 與 -Infinity 一樣
const nan = Number.NaN;                 // 與 NaN 一樣
const inf = Number.POSITIVE_INFINITY;   // 與 Infinity 一樣
```

## 字串

以明確的順序排列的符號序列。

在JavaScript裡面，string代表Unicode文字。Unicode是一種用來表示文字資料的電腦工業標準，每一個已知的人類語言字元或符號，都有一個字碼(code points，包括Emoji)。

字串常值以單引號、雙引號與反引號表示。反引號會啟動ES6樣板字串(template strings)。

### 轉義

呈現文字資料時，區分文字資料與程式本身一向是個問題。用引號將字串包起來是一開始做法，若要在字串中使用引號，需要一種稱為**轉義**的方式，不認為是字串的終止符號。

```
const dialog = 'Sam looked up, and said "Hello, old friend!", as Max walked in.';
```

若要同時使用兩者，以下這個會報錯：

```
const dialog = "Sam looked up and said "don't do that!" to Max";
```

可使用**反斜線**(\)來**轉義**引號，他是一個提示訊號，讓JavaScript知道字串並未結束。

```
const dialog1 = "He looked up and said \"don't do that!\" to Max.";
const dialog2 = 'He looked up and said "don\'t do that!" to Max.';
```

反斜線也可以轉義自己。

```
const s = "In JavaScript, use \\ as an escape character in strings."
```

## 特殊字元

反斜線不僅只能用來轉義引號，也可用來表示非列印字元，例如換行符號與其他Unicode字元。

| 代碼   | 說明                                        | 範例                                                                   |
|--------|---------------------------------------------|------------------------------------------------------------------------|
| \n     | 新行(換行符號)                              | "Line1\nLine2"                                                         |
| \r     | 歸位字元                                    | "Windows line 1\r\nWindows line 2"                                     |
| \t     | Tab                                         | "Speed:\t60kph"                                                        |
| \'     | 單引號                                      |                                                                        |
| \"     | 雙引號                                      |                                                                        |
| \`     | 反引號                                      |                                                                        |
| \$     | 錢號(ES6)                                   | `New in ES6: ${interpolation}`                                         |
| \\     | 反斜線                                      |                                                                        |
| \uXXXX | 任意的Unicode字碼(其中+XXXX+是十六進位字碼) | "De Morgan's law: \u2310(P \u22c0Q) \u21D4 (\u2310P) \u22c1 (\u2310Q)" |
| \xXX   | Latin-1字元(其中+XX+是十六進位Latin-1字碼)  | "\xc9p \xe9e is fun, but foil is more fun"                             |


Latin-1字元集是Unicode的子集合，所有Latin-1字元\xXX都可以用對應的Unicode字碼\u00XX來表示。

不須對Unicode字元使用轉義碼。

少用的特殊字元：

| 代碼 | 說明     | 範例               |
|------|----------|--------------------|
| \0   | NULL字元 | "ASCII NULL: \0"   |
| \v   | 垂直tab  | "Vertical tab: \v" |
| \b   | 倒退     | "Backspace: \b"    |
| \f   | 換頁     | "Form feed: \f"    |

### 字串樣板

ES6新增**字串樣板**(亦稱**字串插值**)，提供一種簡便方式，可將值注入字串。

```
let currentTemp = 19.5;
const message = `The current temperature is ${currentTemp}\u00b0c`;
```

可以在大括號裡面使用任何運算式。

### 多行字串

ES6前，多行字串的支援是不一致的。可在一行原始程式的結尾轉義換行，但瀏覽器支援不可靠。到ES6，這功能比較有機會使用。

```
const multiline = "line1\
line2";
```

多行，含換行符號的字串：

```
const multiline = "line1\n\
line2"
```

```
const multiline = `line1
line2`
```
使用上述兩個方式，所有行頭的縮排，都會被加入產生的字串之中。例如：

```
const multiline = `line1
    line2
    line3`;
```

通常建議還是這樣寫：

```
const multiline = "line1\n" +
    "line2\n" +
    "line3";
```

可以在字串串接中混合匹配字串型態：

```
const multiline = 'Current temperature:\n' +
    `\t${currentTemp}\u00b0C\n` +
    "Don't worry...the heat is on!";
```

### 將數字當成字串

JavaScript必要時會將含有數字的字串自動轉換數字。發生時機不容易理解。

```
const result1 = 3 + '30'; // 3會轉換為字串，結果：'330'
const result2 = 3 * '30'; // '30'會轉換成數字，結果是數字90
```

接受使用者輸入時，他幾乎都是字串。是否轉數字決定權在你。

## 布林

true與false。JavaScript可容許你將**任何**值(不是只有數字)視為true或false。

不要使用引號，"false"其實是true。

## 符號

**符號**是ES6新增的功能，他是一種新的資料型態，可表示獨一無二的標記。當建立符號時，是唯一的：他不會匹配其他的符號。所以，符號就像物件(每一個物件都是唯一的)。但是另一方面，符號是基本型態，因此它們是一種實用的語言功能，具擴充性。

符號是用`Symbol()`建構式建立的，可選擇提供一個說明，這只是為了方便使用：

```
const RED = Symbol();
const ORANGE = Symbol("The color of a sunset!");
RED === ORANGE // false：每一個符號都是唯一的
```

當想要使用獨一無二的識別碼，不希望在無意間與其他的識別碼互相混淆，可使用這符號。

## null與undefined

`null`與`undefined`代表只有一種值，某種不存在的東西。

應該使用`null`資料型態，`undefined`留給JavaScript本身使用，來指出哪些東西還沒有被賦值。

想要刻意模仿未被賦值的變數行為，才會明確將變數設為`undefined`。

當想要表達一個變數的值是未知或不可使用的，`null`是較好的選擇。

```
let currentTemp;         // 隱含undefined
const targetTemp = null; // 目標溫度null -- "還不知道"
currentTemp = 19.5;
currentTemp = undefined; // 就像還沒被初始化一樣，不建議使用
```

## 物件

不可變的基本型態只能代表一個值，物件代表多個或複合值，而且可以在他的生命週期中改變。

物件是一種`容器`，容器的內容物會隨著時間去改變(同樣物件，裡面有不同內容)。

與基本型態相同的是，物件有常值語法：大括號。

```
const obj = {};
```

物件內容稱為**特性**(property)(或**成員**)，由**名稱**(或**鍵**)與**值**組成。名稱需使用字串或符號，值可以是任何型態。

將特性加到obj：

```
obj.size;
obj.color;
```

使用成員存取運算子，名稱必須是有效的識別碼。若特性名稱非有效，就必須使用**計算成員存取**(computed member access)運算子(也適用有效識別碼)：

```
obj["not an identifier"] = 3;
obj["not an identifier"]; // 3
obj["color"];
```

也可同時使用符號特性與計算成員存取運算子：

```
const SIZE = Symbol();
obj[SIZE] = 8;
obj[SIZE]; // 8
```

obj的特性沒有列SIZE符號，這是正確的，符號特性是用不同的方式處理的，而且預設不顯示。obj.SIZE與obj[SIZE]沒有相關，obj.SIZE是字串"SIZE"特性(成員存取特性**一定**可以操作字串特性)。

以上已經操作與修改變數obj儲存的物件了，但**obj始終指向同一個物件**，修改它，它就是**不同**的基本型態值。換句話說，obj一直指向同一個物件，但物件本身已經改變了。

物件的常值語法，大括號內，**特性是以逗號分隔**，**名稱與值以分號來分隔**。

```
const sam1 = {
  name: 'Sam',
  age: 4,
};
const sam2 = { name: 'Sam', age: 4 };
const sam3 = {
  name: 'Sam',
  classification: {
    kingdom: 'Anamalia',
    phylum: 'Chordata',
    family: 'Felidae',
  },
};
```

sam1與sam2特性一樣，但他們是兩個不同的物件。

存取sam3的classification特性：

```
sam3.classification.family;
sam3['classification.family'].family;
sam3.classification.['family'];
sam3.['classification'].['family'];
```

物件也可以容納**函式**，函式裡面有程式碼(副程式)

```
sam3.speak = function() { return "Meow!"; };
sam3.speak(); // "Meow!"
```

可以用delete運算子刪除物件的特性：

```
delete sam3.classification;
delete sam3.speak;
```

## 數字、字串與布林物件

Number、String與Boolean，這些物件有兩種特性：

- 儲存特殊的值(ex: Number.INFINITY)
- 函式的形式來提供功能

    ```
    const s = "hello";
    s.toUpperCase(); // "HELLO"
    ```
    
    JavaScript會建立暫時的String物件。呼叫函式後，JavaScript會捨棄這個物件。
    
    ```
    const s = "hello";
    s.rating = 3; // 沒有錯誤...成功？
    s.rating;     // undefined
    ```
    
## 陣列

陣列是特殊的物件型態。是自然排序，而且鍵是數字，且循序。陣列提供了一些實用的方法。

JavaScript的陣列是有效率、使用**索引的C語言陣列**以及更強大的**動態陣列**與**鏈結串列**的混合體。具以下特性：

- 陣列大小是不固定的
- 陣列內容不一定是同一種型態
- 陣列從零開始

建立JavaScript陣列常值，可使用方括弧，裡面以逗號分隔陣列元素：

```
const a1 = [1, 2, 3, 4];
const a2 = [1, 'two', 3, null];
const a3 = [
  "What th hammer? What th chain?",
  "In What furnace was thy brain?",
];
const a4 = [
  { name: "Ruby", hardness: 9 },
  { name: "Diamond", hardness: 10 },
];
const a5 = [
  [1, 3, 5],
  [2, 4, 6],
];
```

陣列有`length`特性，可回傳陣列的元素數量：

```
const arr = ['a', 'b', 'c'];
arr.length;
```

存取陣列各元素：

```
const arr = ['a', 'b', 'c'];
arr[0];
arr[arr.length - 1];

arr[2] = 3; // 現在arr是['a', 'b', 3]
```

JSON是一種常用的JavaScript式資料語法，他**不**容許最後的逗號。

## 日期

一開始從Java直接移植的，很難使用，尤其是當要處理不同時區的日期時。

建立一個日期，初始值是目前的日期與時間：

```
const now = new Date();
now; // Thu Aug 20 2015 18:31:26 GMT-0700 (太平洋夏令時間)
```

建立特定日期：

```
const halloween = new Date(2016, 9 ,31); // 注意月份是從零開始的：9 = 10月
const halloweenParty = new Date(2016, 9, 31, 19, 0);
```

```
halloweenParty.getFullYear();
halloweenParty.getMonth();
halloweenParty.getDate();
halloweenParty.getDay();
halloweenParty.getHours();
halloweenParty.getMinutes();
halloweenParty.getSeconds();
halloweenParty.getMilliseconds();
```

## 正規表達式

regular expression，是JavaScript的一種子語言。可以用一種扎實的方式來針對字串執行複雜搜尋與替換。

JavaScript的正規表達式是以`RegExp`來表示的，他使用一種常值語法，由一對斜線與他們之間的符號構成的。

```
// 非常簡單的email識別器
const email = /\b[a-z0-9._-]+@[a-z_-]+(?:\.[a-z]+)+\b/;
// US電話號碼識別器
const phone = /(:?\+1)?(:?\(\d{3}\)\s?|\d{3}[\s-]?)\d{3}[\s-]?\d{4}/;
```

## Map與Set

ES6加入新的資料型態`Map`與`Set`，以及他們的"弱"參考版本`WeakMap`與`WeakSet`。

Map與物件一樣，會將鍵對應到值，某些情況會比物件還要好的優點。

Set與陣列很像，但他們無法容納重複項目。

弱參考的功能也很像，但它們會在某些情況下限制一些功能，換取更多效能。

## 資料型態轉換

### 轉換成數字

字串轉數字：

1. Number物件建構式

    ```
    const numStr = "33.3";
    const num = Number(numStr); // 這會建立一個數字值
                                // 「不是」Number物件實例
    ```
    
    如果字串無法轉數字，會回傳`NaN`

2. 內建parseInt與parseFloat函式

    跟Number建構式很像，但有一些不同的地方。使用parseInt可以指定一個radix，這是被解析的數字的基數。例如，可以指定基數16來解析十六進位數字。建議務必指定radix，即使是10(default)。
    
    parseInt與parseFloat會捨棄除了數字之外的東西：
    
    ```
    const a = parseInt("16 volts", 10); // 會以基數10來解析
    
    const b = parseInt("3a", 16);       // 解析十六進位3a；結果是58
    const c = parseFloat("15.5 kph");     // parseFloat會假設基數10
    ```
    
Date物件可以用valueOf()方法來轉換成一組數字，代表從UTC 1970年1月1日午夜算起的毫秒數：

```
const d = new Date();
const ts = d.valueOf();
```

有時將布林值轉成 1(true) 或 0(false) 很實用。

```
const b = true;
const n = b ? 1 : 0;
```

### 轉換成字串

JavaScript所有物件都有toString()方法，他會回傳字串表示形式。實務上不是很常用。它很擅長處理數字，但通常不會將數字轉字串，這種轉換通常在字串串接或插值的過程自動發生。但如果想要將數字轉換成字串值，toString()就是你需要的方法。

```
const n = 33.5;
n;
const s = n.toString();
s;
```

Date有個好用的toString()，但大部分物件只會回傳字串"[object object]"。
可以修改物件，讓他回傳更好用的字串表示形式。

轉換陣列時很方便，會將陣列的每一個元素轉成字串，接著用逗號接合那些字串。

```
const arr = [1, true, "hello"];
arr.toString(); // "1,true,hello"
```

### 轉換成布林

JavaScript的`truthy`與`falsy`，它是將所有值強制轉換成`true`或`false`的方式。

可以使用兩個not運算子(!)來將任何值轉換成布林。使用一個not運算子可將值轉換成布林。但結果會與你要的相法，再使用一次，就可以轉換成你想要的值。在轉換數字時，也可使用`Boolean`建構式來產生一樣的結果。

```
const n = 0;           // "falsy"值
const b1 = !!n;        // false
const b2 = Boolean(n); // false
```

## 總結

在程式語言中使用的資料型態，就是該語言表達事務的基本元素。


