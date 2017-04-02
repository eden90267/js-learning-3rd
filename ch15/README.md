# 日期與時間

JavaScript的`Date`物件功能有限。這裡會介紹`Moment.js`，它擴充了`Date`物件的功能，涵蓋經常用到的功能。

JavaScript的Date是從Java的java.util.Date移植過來的。

## 日期、時區、時戳與Unix Epoch

這個世界被分成許多時區(TZ)，所有時區都被定義成**國際標準時間**(Coordinated Universal Time)的偏差值。UTC有時會被稱為格林威治標準時間(GMT)。

一年中的時間點有夏天是日光節約時間，其他時間是標準時間。

```
new Date(); // Sat Apr 01 2017 17:29:33 GMT+0800 (+08)
```

這是很詳細的格式，同時使用UTC(國際標準時間)的偏移值與名稱來表示時區。

JavaScript中，所有Date實例都會被存成單一數字：從Unix Epoch算起的毫秒數(不是秒數)。當你請求JavaScript時，它通常會將這個數字轉換成人類看得懂的西曆日期。如果想看數字表示方式，只要使用`valueOf()`方法即可。

```
const d = new Date();
console.log(d);
console.log(d.valueOf());
```

## 建構Date物件

有四種建構方式

- 沒使用任何引數，會回傳一個表示目前日期的Date物件。
- 提供一個字串讓JavaScript試著解析
- 指定一個特定區域日期，最小單位可到毫秒

```
> new Date();
2017-04-02T01:20:28.302Z

// 注意，月份在JavaScript中是從零算起的：0 = 一月，1 = 二月，以此類推
> new Date(2015, 0);
2014-12-31T16:00:00.000Z
> new Date(2015, 1);
2015-01-31T16:00:00.000Z
> new Date(2015, 1, 14);
2015-02-13T16:00:00.000Z
> new Date(2015, 1, 14, 13);
2015-02-14T05:00:00.000Z
> new Date(2015, 1, 14, 13, 30);
2015-02-14T05:30:00.000Z
> new Date(2015, 1, 14, 13, 30, 5);
2015-02-14T05:30:05.000Z
> new Date(2015, 1, 14, 13, 30, 5, 500);
2015-02-14T05:30:05.500Z

// 用Unix Epoch時戳來建立日期
> new Date(0);
1970-01-01T00:00:00.000Z
> new Date(1000);
1970-01-01T00:00:01.000Z
> new Date(1463443200000);
2016-05-17T00:00:00.000Z

// 使用負數日期來取得Unix Epoch之前的日期
> new Date(-365*24*60*60*1000);
1969-01-01T00:00:00.000Z

// 解析日期
> new Date('June 14, 1903');
1903-06-13T16:00:00.000Z
> new Date('June 14, 1903 GMT-0000');
1903-06-14T00:00:00.000Z
```

(以上是在Node上執行)

你會看到的是，結果都是**地區時間**。除非你的位置在UTC。JavaScript Date物件，無法指定時區。它一定會在內部將物件存為UTC，並根據地區時間來格式化。

因JavaScript原本是瀏覽器使用的指令碼語言，這原本是“做正確的事”。如果你要顯示日期，應是想要顯示以使用者的時區表示的日期。但，因為Internet全球性(以及Node將JavaScript帶到伺服器)，更強健地處理時區是很有必要的。

## Moment.js

傑出且強大的日期程式庫：Moment.js

Moment.js有兩種版本：

- 支援時區
- 不支援時區

支援時區的版本大很多(包含世界的所有時區)。

web專案，可用cdn方式。

```
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment-timezone/0.5.11/moment-timezone.min.js"></script>
```

Node可用`npm install --save moment-timezone`，接著用`require`來參考它。

`const moment = require('moment-timezone');`

Moment.js很大也很強健，如果需要操作日期，它應該已經擁有你需要的功能。

### 建構日期

建構一個沒明確時區的日期，會依照日期被建構的**地點**而定。

### 在伺服器上建構日期

如果要在伺服器建構日期，建議一定要使用UTC或明確地指定時區。

如果想使用UTC日期，Date物件的UTC方法來建構它們：

```
> new Date(Date.UTC(2016, 4, 27));
2016-05-27T00:00:00.000Z
```

※ `Date.UTC`接收的引數與Date建構式一樣，但它不會回傳一個新的`Date`實例，而是回傳日期值。可再將那個數字傳入Date建構式來建立一個日期實例。

如果需要在位於特定時區的伺服器上建構日期(而且不想要親手轉換時區)，可使用`moment.tz`來建構使用特定時區的Date實例。

```
const moment = require('moment-timezone');

// 傳遞一個陣列給Moment.js，使用JavaScript的Date建構式一樣的參數，包含從零算起的月份
// toDate()會傳遞回JavaScript Data物件

// America/Los_Angeles: -07:00
const d = moment.tz([2016, 3, 27, 9, 19], "America/Los_Angeles").toDate();
console.log(d); // 2016-04-27T16:19:00.000Z (.toDate()：+07:00回UTC的時間)
```

### 在瀏覽器上建構日期

JavaScript的預設行為比較適合瀏覽器。瀏覽器可從作業系統知道它在哪個時區，使用者通常喜歡使用地區時間。如果要建構的app需要在其他地區處理日期，那麼你就需要使用`Moment.js`來進行轉換，並顯示其他的時區。

## 傳輸日期

伺服器傳給瀏覽器，或相反。可能會在不同的時區，而使用者想看他們的時區的日期。JavaScript Date實例會以UTC、Unix Epoch偏移量的方式來儲存日期，所以四處傳遞Date物件通常沒有問題。

最確保日期被安全傳遞的做法，是使用JSON。JSON規格其實沒有指定日期的資料型態，這是不幸的事，因為它會防止JSON的對稱解析(symmetric parsing)。

```
const before = { d: new Date() };
before.d instanceof Date;            // true
const json = JSON.stringify(before);
const after = JSON.parse(json);
after.d instanceof Date;             // false
typeof after.d;                      // "string"
```

JSON無法無縫且對稱地處理JavaScript的日期。不過JavaScript使用的字串序列化是一致的，所以可以將日期“恢復”。

```
after.d = new Date(after.d);
after.d instanceof Date;    // true
```

無論用什麼時區，當他被編碼為JSON時，它就是UTC，且當你將JSON編碼的字串傳入Date建構式，日期就會用地區時間來顯示。

另一種在用戶端與伺服器之間安全地傳遞日期的方式，是直接用日期的數字值。

```
const before = { d: new Date().valueOf() };
typeof before.d;                            // "number"
const json = JSON.stringify(before);
const after = JSON.parse(json);
typeof after.d;                             // "number"
const d = new Date(after.d);
```

## 顯示日期

JavaScript內建的Date物件只有少量的內建日期格式。幸運的是，Moment.js特別擅長做這些事情。

用Moment.js來將日期格式化，可使用它的`format`方法。此方法會接收一個使用**中繼字元**的字串，將它轉換成適當的日期元件。

```
const moment = require('moment-timezone');

const d = new Date(Date.UTC(1930, 4, 10));

// 以下是顯示給 Taipei 的人看的輸出

d.toLocaleDateString();  // '5/10/1930'
// d.toLocaleFormat();      // error，沒有這個方法
d.toLocaleTimeString();  // '8:00:00 AM'
d.toTimeString();        // '08:00:00 GMT+0800 (+08)'
d.toUTCString();         // 'Sat, 10 May 1930 00:00:00 GMT'

moment(d).format('YYYY-MM-DD');               // "1930-05-10"
moment(d).format("YYYY-MM-DD HH:mm");         // "1930-05-10 08:00"
moment(d).format("YYYY-MM-DD HH:mm Z");       // "1930-05-10 08:00 +08:00"
moment(d).format("YYYY-MM-DD HH:mm [UTC]Z");  // "1930-05-10 08:00 UTC+08:00"

moment(d).format("dddd, MMMM [the] Do, YYYY");// "Saturday, May the 10th, 1930"

moment(d).format("h:mm a");                   // "8:00 am"
```

須提供多個地區的日期格式，Moment.js才能實現。

Moment.js格式化項目，有些共同的使用慣例。比較多字母代表比較詳細的資訊。

- `M`：1, 2, 3,...；`MM`：01, 02, 03,...；`MMM`：January, February, March,...。
- `o`：序數字；`Do`：1st, 2nd, 3rd,...
- 不想要被解譯中繼字元的字母，可用中括號將它們包起來：`[M]M`會給你M1、M2，以此類推。

※ Moment.js無法解決“時區縮寫”的使用。由於缺乏一致的國際標準，Moment.js棄用z格式化字元。

## Date元件

需存取Date實例的各個元件：

```
const d = new Date(Date.UTC(1815, 9, 10));

d.getFullYear();     // 1815
d.getMonth();        // 9 - October
d.getDate();         // 9
d.getDay();          // 2 - Tuesday
d.getHours();        // 8
d.getMinutes();      // 0
d.getSeconds();      // 0
d.getMilliseconds(); // 0 

// 也有對應以上日期的UTC
d.getUTCFullYear();  // 1815
d.getUTCMonth();     // 9 - October
d.getUTCDate();      // 10
```

當你使用Monent.js，會不太需要使用個別的元件。

## 比較日期

可直接使用JavaScript的內建比較運算子。Date實例會將日期存成數字，所以可直接用比較願算子來比較數字：

```
> const d1 = new Date(1996, 2, 1);
undefined
> const d2 = new Date(2009, 4, 27);
undefined
> d1 > d2
false
> d1 < d2
true
```

## 日期算數

日期只是數字，你可將日期相減，來取得它們之間的毫秒數差距：

```
> const msDiff = d2 - d1;
undefined
> msDiff;
417744000000
 const daysDiff = msDiff/1000/60/60/24;
undefined
> daysDiff
4835
```

因為這個特性，你也可以輕鬆地用Array.prototype.sort來排序日期：

```
const dates = [];

const min = new Date(2017, 0, 1).valueOf();
const delta = new Date(2020, 0, 1).valueOf() - min;
for (let i=0; i<10; i++) {
    dates.push(new Date(min + delta*Math.random()));
}

// 降冪
dates.sort((a, b) => b - a);
console.log(dates);
// 升冪
dates.sort((a, b) => a - b);
console.log(dates);
```

Moment.js有許多強大的方法可作常見的日期算數，可讓你增加或減去隨意的時間單位。

```
const moment = require('moment-timezone');

let m = moment();      // moment("2017-04-02T13:27:16.956")
m.add(3, 'days');      // moment("2017-04-05T13:27:16.956")
m.subtract(2, 'years'); // moment("2015-04-05T13:27:16.956")

m = moment();           // 重置
m.startOf('year');      // moment("2017-01-01T00:00:00.000")
m.endOf('month');       // moment("2017-01-31T23:59:59.999")
```

Moment.js也可鏈結方法：

```
const m = moment()
   .add(10, 'hours')
   .subtract(3, 'days')
   .endOf('month');
```

## 方便使用者的相對日期

Moment.js可讓你輕鬆地使用“三天前”，而不是那個日期：

```
const moment = require('moment-timezone');

moment().subtract(10, 'seconds').fromNow();  // a few seconds ago
moment().subtract(44, 'seconds').fromNow();  // a few seconds ago
moment().subtract(45, 'seconds').fromNow();  // a minute ago
moment().subtract(5, 'minutes').fromNow();   // 5 minutes ago
moment().subtract(44, 'minutes').fromNow();  // 44 minutes ago
moment().subtract(45, 'minutes').fromNow();  // an hour ago
moment().subtract(5, 'hours').fromNow();     // 5 hours ago
moment().subtract(21, 'hours').fromNow();    // 21 hours ago
moment().subtract(22, 'hours').fromNow();    // a day ago
moment().subtract(319, 'days').fromNow();    // 10 months ago
moment().subtract(320, 'days').fromNow();    // a year ago
```

Moment.js可以隨意(但合理)地決定何時該顯示不同的單位。

## 總結

- 在內部，日期會以從Unix Epoch(UTC 1970年1月1日)算起的毫秒數來表示
- 當你要建構日期時，小心處理時區
- 如果你想要使用複雜的日期格式，可考慮Moment.js