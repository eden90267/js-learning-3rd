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

## 轉義

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