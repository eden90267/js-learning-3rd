# 正則表達式

提供複雜的字串匹配功能。與字串匹配對應的是字串取代。

## 找出並替換子字串

regex基本工作，就是找出字串內的子字串，並視情況替換它。

如果只是確定一個較大型的字串裡面有沒有某一個子字串，String.prototype就夠用了：

```
> const input = "As I was going to Saint Ives";
undefined
> input.startsWith("As")
true
> input.endsWith("Ives")
true
> input.startsWith("going",9)
true
> input.endsWith("going",14)
true
> input.includes("going")
true
> input.includes("going", 10)
false
> input.indexOf("going")
9
> input.indexOf("going", 10)
-1
> input.indexOf("nope")
-1
```

這些方法都是有區分大小寫的。不區分大小寫的比較：

```
input.toLowerCase().startsWith("as");
```

`String.prototype.toLowerCase`會回傳一個新的字串。(JavaScript的字串是不可變的)

進一步尋找子字串並替換它：

```
> const output = input.replace("going", "walking");
undefined
> output
'As I was walking to Saint Ives'
```

同樣，也不會影響到原始input字串。

## 建構正規表達式

JavaScript的regex是以類別`RegExp`來表示的。regex的重要性，足以讓他們擁有自己的常值語法。regex常值是以斜線來制定的：

```
const re1 = /going/;             // 可搜尋"going"字眼的regex
const re2 = new RegExp("going"); // 等效的物件建構式
```

除了特例外，應該優先使用較方便的常值語法。

## 用正規表達式來搜尋

regex /\w{3,}/ig，它會找出所有三個字母以上的單字(區分大小寫)。

```
> const input = "As I was going to Saint Ives";
undefined
> const re = /\w{3,}/ig;
undefined

// 開始使用字串(input)
> input.match(re);
[ 'was', 'going', 'Saint', 'Ives' ]
> input.search(re);
5

// 開始使用regex (re)
> re.test(input);
true
> re.exec(input);
[ 'was', index: 5, input: 'As I was going to Saint Ives' ]
> re.exec(input);
[ 'going', index: 9, input: 'As I was going to Saint Ives' ]
> re.exec(input);
[ 'Saint', index: 18, input: 'As I was going to Saint Ives' ]
> re.exec(input);
[ 'Ives', index: 24, input: 'As I was going to Saint Ives' ]
> re.exec(input);
null

// 這些方法都可以直接使用regex常值
```

最常使用：

- `String.prototype.match`
- `String.prototype.test`

## 用正規表達式來替換

String.prototype.replace方法，可接收regex，但它可做的事更多。

```
> const input = "As I was going to Saint Ives";
undefined
> const output = input.replace(/\w{4,}/ig, '****');
undefined
> output
'As I was **** to **** ****'
```

## 輸入消化

**消化輸入字串的模式**。匹配是這種看法的附屬功能。

regex“消化”字串時採取的演算法：

- 字串會從左到右地消化
- 當一個字元被消化時，regex就不會回去察看它
- 如果沒有符合的可能，regex會一次前進一個字元，來尋找符合的對象
- 如果找到符合的對象，regex會一次消化那個對象的所有字元，並從下一個字元開始尋找(當regex是全域時)

如果regex認為不可能有符合的對象時，演算法會提早中止。

## 分支結構

HTML字串中，想找到所有可參考外部資源的標籤。正規表達式的**分支結構**可解決這個問題：

```
> const html = 'HTML with <a ="/one">one link</a>, and some JavaScript.' +
...    '<script src="stuff.js"></script>';
undefined
> const matches = html.match(/area|a|link|script|source/ig);
undefined
> matches
[ 'a', 'link', 'a', 'a', 'a', 'a', 'Script', 'script', 'script' ]
```

- 分隔號(|)是標示**分支結構**的regex中繼字元。
- ig提示忽略大小寫(i)，並全域搜尋(g)。

    如果沒有g，它只會回傳第一個符合的目標。

可將它解讀成：尋找文字area、a、link、script或source的所有實例，忽略大小寫。

area在a前面，因為regex會從左到右執行分支結構。如果a在前面會優先被消化，rea就不符合任何東西了。

這段範例會有意想不到的匹配結果：單字link與非HTML標籤的字母a。

解決問題方式是將regex改為`/<area|<a|<link|<script|<source/`(角括號不是regex中繼字元)。

## 匹配HTML

可用regex做些實用的工作，但不可用regex來**解析HTML**。**解析**的意思是將一個東西完全分解成零組件。regex只能用來解析正規的語言。處理較複雜的語言，regex會有其限制必須理解。針對HTML來說，因為很有可能會創造出讓regex束手無策的HTML。為了能夠100%處理事情，你必須使用解析器。

```
> const html = '<br>[!CDATA[[<br>]]]';
undefined
> const matches = html.match(/<br>/ig);
undefined
> matches
[ '<br>', '<br>' ]
```

這範例會匹配兩個，但，只有一個真正的<br>標籤，另一個符合的字串只是非HTML字元資料(CDATA)，如果要用regex來匹配階層式資料(<p>標籤裡面的<a>標籤)，它的能力也十分有限。

如果你在使用regex來匹配很複雜的東西時覺得很掙扎，應該可以直接將regex視為不是正確的工具。

## 字元集合

字元集合提供一種扎實的方式來表示**單一字元**的分支結構。例如，想找出字串中所有數字：

```
> const beer99 = "99 bottles of beer on the wall " +
... "take 1 down and pass it around -- " +
... "98 bottles of beer on the wall."
undefined
> const matches = beer99.match(/0|1|2|3|4|5|6|7|8|9/g);
undefined
> matches
[ '9', '9', '1', '9', '8' ]
```

但要尋找的不是數字，而是字母？數字與字母？非數字東西？此時就是用字元集合的時機了。它們是以更扎實的方式，來表達一位數字(single-digit)的分支結構。可用它們來指定範圍。

```
> const m1 = beer99.match(/[0123456789]/g);
undefined
> m1
[ '9', '9', '1', '9', '8' ]
> const m2 = beer99.match(/[0-9]/g);
undefined
> m2
[ '9', '9', '1', '9', '8' ]
```

你甚至可以結合範圍。以下是匹配字母、數字與一些其他的標點符號的方式(這會找出原始字串中，除了空白之外的東西)：

```
const match = beer99.match(/[\-0-9a-z.]/ig);
```

順序是無關緊要的：可直接寫成`/[.a-z0-9\-]/`。必須將虛線轉譯來找出它，否則，JavaScript將會視它為範圍一部分(也可將它放在結束的方括號之前，不用轉義)。

字元集合另一種強大的功能是它可以**否定**字元集合。意思是“找出**除了**這些字元之外的其他所有東西”。要否定一個字元集合，必須在集合的第一個字元使用插入符號(^)：

```
> const match = beer99.match(/[^\-0-9a-z.]/);
undefined
> match1
[ ' ',
  index: 2,
  input: '99 bottles of beer on the wall take 1 down a
nd pass it around -- 98 bottles of beer on the wall.'
]
```

這只會匹配原始字串的空白。

## 有名稱的字元集合

有些字元集合很常見且實用，所以他們有方便的縮寫：

| 有名稱的字元集 | 相當於       | 說明                                                          |
|----------------|--------------|---------------------------------------------------------------|
| \d             | [0-9]        |                                                               |
| \D             | [^0-9]       |                                                               |
| \s             | [ \t\v\n\r]  | 包括tab、空格與垂直定位字元                                   |
| \S             | [^ \t\v\n\r] |                                                               |
| \w             | [a-zA-Z_]    | 這不包括破折號與句點，所以他不適合網域名稱與CSS類別之類的東西 |
| \W             | [^a-zA-Z_]   |                                                               |

這些縮寫中，或許最常用的是空白集合(\s)。譬如，空白通常被用來排列文字，但如果你試著用程式來解析它，可能希望可以找出各種數量的空白。

```
> const stuff =
... 'hight:      9\n' +
... 'medium:     5\n' +
... 'low:        2\n';
undefined
> const levels = stuff.match(/:\s*[0-9]/g);
undefined
> levels
[ ':      9', ':     5', ':        2' ]
```

- *：代表“零或更多的空白”

否定字元類別(`\D`、`\S`與`\W`)可以省略多餘的內容。ex：可在電話號碼存入資料庫前，先將它正規化。

```
> const messyPhone = '(505) 555-1515';
undefined
> const neatPhone = messyPhone.replace(/\D/g, '');
undefined
> neatPhone;
'5055551515'
```

同樣的，通常會使用`\S`來確保在必要的欄位中有資料(它們至少必須有一個除了空白之外的字元)

```
> const field = '    something    ';
undefined
> const valid = /\S/.test(field);
undefined
> valid
true
```

## 重複

“重複中繼字元”可指定某個東西要匹配的次數。考慮之前找出單一數字的範例。如果我們想要找出**數字**要怎麼辦(可能包含多個連續的數字)？使用我們已知道的東西：

```
const match = beer99.match(/[0-9][0-9][0-9]|[0-9][0-9]|[0-9]/g);
```

先匹配最具體的三位數，再匹配較不具體的二位數。但加入四位數又必須加入更多東西。幸運的是，我們有更好的處理方式：

```
const match = beer99.match(/[0-9]+/g);
```

注意字元群組後面的`+`：這會指名**之前的元素**必須匹配一或多次。重複中繼字元是**修改符號**，可修改**它們之前的東西**。它們不會(且不能)獨自存在。重複修改符號有五種：

| 重複修改符號 | 說明                | 範例                                                          |
|--------------|---------------------|---------------------------------------------------------------|
| {n}          | 剛好n個             | /\d{5}/只會匹配五位數(例如郵遞區號)                           |
| {n,}         | 至少n個             | /\d{5,}/只會匹配五位數以上                                    |
| {n,m}        | 至少n個，最多m個    | /\d{2,5}/只會匹配至少兩位，但不超過五位的數字                 |
| ?            | 零或一，相當於{0,1} | /[a-z]\d?/i會匹配一個數字(可有可無)且前面有一個字母           |
| *            | 零或多個            | /[a-z]\d*/i會匹配一個數字(零或多個)且前面有一個字母           |
| +            | 一或多個            | /[a-z]\d+/i會匹配一個數字(必要，可能是多位數)且前面有一個字母 |

## 句點中繼字元與轉譯

在regex中，句點是個特殊字元，代表“匹配所有東西”(除了換行字元之外)。這個一網打盡的中繼字元，通常用來消化你不在乎的輸入部分。

尋找五位數的郵遞區號，並且不在乎那一行其餘的所有東西：

```
> const input = "Address: 333 Main St., Anywhere, NY, 55532. Phone: 555-555-2525.";
undefined
> const match = input.match(/\d{5}.*/);
undefined
> match
[ '55532. Phone: 555-555-2525.',
  index: 37,
  input: 'Address: 333 Main St., Anywhere, NY, 55532.
Phone: 555-555-2525.' ]
```

如果要匹配常值句點，regex中繼字元的東西，例如星號與括號。要轉譯任何特殊的regex字元，只要在它前面加上一個**反斜線**就可以了。

```
> const equation = "(2 + 3.5) * 7";
undefined
> const match = equation.match(/\(\d \+ \d\.\d\) \* \d/);
undefined
> match
[ '(2 + 3.5) * 7', index: 0, input: '(2 + 3.5) * 7' ]
```

### 真正的萬用字元

句點可匹配**除了**換行符號之外的所有字元，但你該如何匹配**包含**換行符號的所有字元？

最常用的應該是：`[\s\S]`。它會匹配所有空白...以及所有不是空白的東西。

## 群組化

**群組化**可讓我們建構**子運算式**，我們可將它視為一個單位。

群組化也可以“捕捉”群組的結果(default)。但有一種方式可建立“非捕捉群組”。鼓勵優先使用非捕捉群組，效能比較好，且之後不需使用群組結果，應使用非捕捉群組。

群組用括號來表示，而非捕捉群組長得像`(?:<subexpression>)`，其中`<subexpression>`是你想要匹配的東西。

匹配網域名稱：

```
> const text = "Visit oreilly.com today!";
> const match = text.match(/[a-z]+(?:\.com|\.org|\.edu)/i);
> match
[ 'oreilly.com', index: 6, input: 'Visit oreilly.com today!' ]
```

群組另一好處是，可對他們套用重複字元。群組可對整個字串套用重複。

以下是常見例子，想要匹配URL，而且只想找到以`http://`、`https://`或只是`//`(非協定URL)開頭的URL，可使用“零或一”(?)的群組：

```
> const html = '<link rel="stylesheet" href="http://insecure.com/stuff.css">\n' +
...'<link rel="stylesheet" href="https://secure.com/securestuff.css">\n' +
...'<link rel="stylesheet" href="//anything.com/flexible.css">';
> const matches = html.match(/(?:https?)?\/\/[a-z][a-z0-9-]+[a-z0-9]+/ig);
> matches
[ '//insecure', '//secure', '//anything' ]
```

- `(?:https?)?`
- `\/\/`
- `[a-z][a-z0-9-]+[a-z0-9]+`：網域名稱裡面可以有字母與數字，但他們也會有破折號(但開頭必須是字母，且結尾不能是斜線)

但這範例並不完美。會匹配`//gotcha`(沒有TLD)、`//valid.com`。

## 懶惰匹配、貪婪匹配

正規表達式，半吊子與專案的差別，在於是否了解懶惰匹配與貪婪匹配。預設情況，正規表達式是**貪婪的**，也就是說，在它們停止前，會盡可能地匹配。

```
> const input = "Regex pros know the difference between\n" +
... "<i>greedy</i> and <i>lazy</i> matching.";
undefined
> input.replace(/<i>(.*)<\/i>/ig, '<strong>$1</strong>');
'Regex pros know the difference between\n<strong>greedy</i> and <i>lazy</strong> matching.'
```

字串裡面的`$1`，會被換成群組`(.*)`的內容。

得到令人失望的結果。

regex會消化輸入，直到它滿足匹配之後，才會繼續往前走。預設情況下，它會以**貪婪**方式來做事：它會尋找第一個<i>，接著說“直到我看到</i>，而且**在它之後，我再也不能找到其他的</i>時，我才會停止**”。因為</i>有兩個，它會在第二個停止，而不是第一個。

我們使用一個問號(標示為懶惰)來解決它：

```
input.replace(/<i>(.*?)<\/i>/ig, '<strong>$1</strong>');
```

現在regex引擎會以這種方式看待這個regex：“當我看到</i>就會停止”。所以它會在看到</i>就懶惰地停止比對，不會繼續掃描其他符合的對象。

所有的重複中繼字元一`*`、`+`、`?`、`{n}`、`{n,}`與`{n,m}`後面都可以加上一個問號，來標示為懶惰(實務上只會在`*`與`+`使用它)。

## 反向參考

因為有群組化，可以使用另一種技術：**反向參考**。不常使用的一種regex功能，但它在一種情況下很好用。

例如，比對符合XYYX模式的品牌名稱。想要比對PJJP、GOOG與ANNA。此時就需要用到反向思考。regex內的每一個群組(包括子群組)都會被指派一個數字，從左到右，從1開始。你可在regex中，使用反斜線與一個數字來參考那個群組。“\1代表符合群組#1的東西”。

```
const promo = "Opening for XAAX is the dynamic GOOG! At the box office now!";
const bands = promo.match(/(?:[A-Z])(?:[A-Z])\2\1/g);
```

(測試結果要取消“非捕捉”群組才match的到)

如果第一個群組匹配X，且第二個群組匹配A，那麼\2必須匹配A，且\1必須匹配X。

作者之前只有在匹配引號的時候，才會用到反向思考。

在HTML，你可以使用單引號或雙引號來代表屬性值。所以我們可以輕鬆地做出這種事情：

```
const html = `<img alt='A "Simple" example.'>` +
   `<img alt="Don't abuse it!">`;
const matches = html.match(/<img alt=(?:['"]).*?\1/g);
```

(測試結果要取消“非捕捉”群組才match的到)

目前有做些簡化，如果alt沒在最前面就無法工作，有額外空白就無法工作，稍後會再返回來解決這個問題。

## 替換群組

群組有一種好處，就是它可以進行較複雜的替換。延續HTML範例，假設想要拿掉`<a>`標籤的`href`之外的任何東西：

```
> let html = '<a class="nope" href="/yep">Yep</a>';
> html = html.replace(/<a .*?(href=".*?").*?>/, '<a $1>');
'<a href="/yep">Yep</a>'
```

如同反向參考，所有群組都會被指派一個數字，這個範例如果href使用單引號，這個regex會失敗。

延伸範例，保留class屬性與href，其他都不留：

```
let html = '<a class="yep" href="/yep" id="nope">Yep</a>';
html = html.replace(/<a .*?(class=".*?").*?(href=".*?").*?>/, '<a $2 $1>');
```

這範例regex的問題在於class與href順序必須相同，且使用單引號會失敗。

除了$1、$2等等之外，還有

- $`：符合對象之前的所有東西
- $&：符合對象本身
- $'：符合對象之後的所有東西
- 想用常值錢號，可使用$$

```
const input = "One two three";
> input.replace(/two/, '($`)');
'One (One ) three'
> input.replace(/\w+/g, '($&)');
'(One) (two) (three)'
> input.replace(/two/, "($')");
'One ( three) three'
> input.replace(/two/, "($$)");
'One ($) three'
```

## 函式替換

喜歡的regex功能，可用它來將非常複雜的regex拆解成一些較簡單的regex。

範例：修改HTML元素。將所有<a>連結轉換成非常具體的格式：想保留class、id與href屬性，但移除其他東西。問題在於，你的輸入可能很凌亂。屬性不一定存在，而且當他們存在時，無法保證它們順序相同。所以必須考慮以下的輸入方式(還有許多其他的)：

```
const html =
   `<a class="foo" href="/foo" id="foo">Foo</a>\n` +
   `<A href='/foo' class="foo">Foo</a>\n` +
   `<a href="/foo">Foo</a>\n` +
   `<a onclick="javascript:alert('foo!')" href="/foo">Foo</a>`;
```

可藉由將它拆解成**兩個regex**來大幅減少變化：一個用來辨識<a>標籤，另一個用來將<a>標籤的內容替換成你要的。

先考慮第二個問題。如果只有一個<a>標籤，而且想捨棄除了class、id與href之外的所有屬性。並考慮到屬性不按特定順序出現，可使用`String.prototype.split`，來一次考慮一個屬性。

```
function sanitizeATag(aTag) {
    // 取得部份的標籤
    const parts = aTag.match(/<a\s+(.*?)>(.*?)<\/a>/i);
    // parts[1]是開頭的<a>標籤的屬性
    // parts[2]是介於<a>與</a>標籤之間的東西
    const attributes = parts[1].split(/\s+/); // 拆解成獨立的屬性
    return '<a ' +
        attributes
            .filter(attr =>
                /^(?:class|id|href)[\s=]/i.test(attr)).join(' ') +
        '>' +
        parts[2] +
        '</a>';
}
```

拆解：

1. 用來比對部分的<a>標籤
2. 分割(使用regex來辨識一或多個空白字元)
3. 用來過濾我們想要的屬性

接著，對可能含有許多<a>標籤的HTML區塊使用sanitizeATag。你可輕鬆選出一個只匹配<a>標籤的regex：

```
html.match(/<a .*?>(.*?)<\/a>/ig);
```

用它做什麼？你可傳送一個**函式**給`String.prototype.replace`來作為替換參數。之前只使用字串作為替換參數。使用函式，可以讓你在**每一次替換**時採取特別的動作。在結束範例前，來使用`console.log`，看看它的運作情形：

```
html.replace(/<a .*?>(.*?)<\/a>/ig, function(m, g1, offset) {
  console.log(`<a> tag found at ${offset}. contents: ${g1}`);
});
```

傳至`String.prototype.replace`的函式會依序接收以下的引數：

- 整個被匹配的字串(相當於$&)。
- 被匹配的群組(如果有的話)。引數的數量會與群組一樣多。
- 原始字串的匹配位移植(數字)。
- 原始字串(很少用到)。

我們已經用一個函式來淨化一個<a>標籤，與一種方式來尋找HTML區塊中的<a>標籤了，可直接將它們放在一起：

```
html.replace(/<a .*?>(.*?)<\/a>/ig, function(m, g1, offset) {
  return sanitizeATag(m);
});
```

可再進一步簡化，函式完全匹配，可擺脫匿名函式，直接使用`sanitizeATag`：

```
html.replace(/<a .*?>(.*?)<\/a>/ig, sanitizeATag);
```

記得，大字串中尋找小字串，而且需處理小字串時，可以將函式傳給`String.prototype.replace`！

## 錨定

經常需注意字串的開頭與結尾的東西，或整個字串(非只有一部分)。這時，你需要**錨點**。錨點有兩種：

- `^`會匹配一行字串的開頭
- `$`會匹配一行的結尾

```
> const input = "It was the best of times, it was the worst of times";
undefined
> const beginning = input.match(/^\w+/g);
undefined
> beginning
[ 'It' ]
> const end = input.match(/\w+$/g);
undefined
> end
[ 'times' ]
> const everything = input.match(/^.*$/g);
undefined
> everything
[ 'It was the best of times, it was the worst of times' ]
> const nomatch1 = input.match(/^best/ig);
undefined
> nomatch1
null
> const nomatch2 = input.match(/worst$/ig);
undefined
> nomatch2
null
```

錨點有一些需要注意的細節。一般來說，他們會匹配**整個字串**的開頭與結尾，就像它裡面有換行符號。如果你想要將一個字串視為多行(以換行符號為分隔)，就需使用m(multiline)選項：

```
> const input = "One line\nTwo lines\nThree lines\nFour";
undefined
> const beginnings = input.match(/^\w+/mg);
undefined
> beginnings
[ 'One', 'Two', 'Three', 'Four' ]
> const endings = input.match(/\w+$/mg);
undefined
> endings
[ 'line', 'lines', 'lines', 'Four' ]
```

## 文字邊界匹配

regex有一種經常被忽視的實用功能一**文字邊界匹配**。如同開頭與結尾錨點，文字邊界中繼字元`\b`與它的相反`\B`**不會消化輸入**。

文字邊界的定義，就是有一個`\w`的匹配，它的前面或後面有個`\W`(非文字)字元，或字串的開頭或結尾。想像你試著將英文文字中的`email`地址換成超連結，想像有這幾個狀況要考慮：

```
const inputs = [
    "john@doe.com",
    "john@doe.com is my email",
    "my email is john@doe.com",
    "use john@doe.com, my email",
    "my email:john@doe.com.",
];
```

這些email地址有一個共通點，它們都在文字邊界內。文字邊界另一個優點：因為它們不會消化輸入，所以我們不需要“將它們放回”替換字串。

```
const inputs = [
    "john@doe.com",
    "john@doe.com is my email",
    "my email is john@doe.com",
    "use john@doe.com, my email",
    "my email:john@doe.com.",
];

const emailMatcher =
    /\b[a-z][a-z0-9._-]*@[a-z][a-z0-9._-]+\.[a-z]+(?:\.[a-z]+)?\b/ig;
inputs.map(s => s.replace(emailMatcher, '<a href="mailto:$&">$&</a>'));
// 回傳
// [ '<a href="mailto:john@doe.com">john@doe.com</a>',
//   '<a href="mailto:john@doe.com">john@doe.com</a> is my email',
//   'my email is <a href="mailto:john@doe.com">john@doe.com</a>',
//   'use <a href="mailto:john@doe.com">john@doe.com</a>, my email',
//   'my email:<a href="mailto:john@doe.com">john@doe.com</a>.' ]
```

特別注意替換巨集`$&`**沒有**包含包住email地址的字元...因為它們不會被消化。

當你要搜尋的文字的開頭、結尾有其他文字，或包含其他文字時，文字邊界很方便。例如，`/\bcount/`可找到count與countdown，但不會找到discount、recount或accountable。`/\bcount\B/`只會找到countdown，`/\Bcount\b/`會找到discount與recount，而`/\Bcount\B/`只會找到accountable。


## Lookahead

如果說半吊子與專業的差別，在於是否了解懶惰匹配與貪婪匹配，那麼專業與大師的差別，在於是否暸解lookahead。Lookahead不會消化輸入，這點與錨點及文字邊界相同。但與錨點及文字邊界不同的是，它是通用的，你可以匹配所有子運算式，且不會消化它們。與文字邊界中繼字元一樣的是，lookahead不匹配這件事，可讓你免於“將東西放回”替換。雖是很棒的技巧，但它不是必要的。**如果內容有重疊，lookahead就是必要的**，而且它們可以簡化某些匹配類型。

驗證密碼是否符合規則是lookahead的典型範例。假設我們密碼必須包含：

- 至少一個大寫字母、數字與小寫字母
- 沒有非字母、非數字的字元

當然可使用多個regex：

```
function validPassword(p) {
    return /[A-Z]/.test(p) &&
        /[0-9]/.test(p) &&
        /[a-z]/.test(p) &&
        /[^a-zA-Z0-9]/.test(p);
}
```

假設要將它們結合成一個正規表達式。第一次嘗試失敗了：

```
function validPassword(p) {
    return /[A-Z].*[0-9][a-z]/.test(p);
}
```

它希望大寫字母在數字之前，數字在兩個小寫字母之前，何況我們還沒測試無效的字元。而且沒有任何方法可以做到這一點，因為在regex的執行過程中，字元會被消化。

為了處理這個狀況，lookahead不會消化輸入，基本上，每一個lookahead都是一個獨立的regex，且不會消化任何輸入。JavaScript的lookahead長得像`(?=<subexpression>)`。它也有“負lookahead”：`(?!<subexpression>)`，這只會匹配**不是**在subexpression之後的東西。

```
function validPassword(p) {
    return /(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?!.*[^a-zA-Z0-9])/.test(p);
}
```

當看到此範例，你可能會想，多個regex函式比較好，至少比較容易閱讀。但它展示了其中一種lookahead(與負lookahead)的重要用途。

lookahead當然屬於“進階的regex”，但對處理某些問題來說非常重要。

## 動態建構Regex

優先使用regex常值：

- 少打四個字母
- 不用像JavaScript字串一樣轉義反斜線

需要使用RegExp建構式的時機，是你想要**動態**建構regex時。譬如你想要找出一個字串中的帳號陣列；你沒辦法將這些帳號放入regex常值。這就是使用Regex建構式的時機，因為它會用一個字串來建構regex，而這字串**可以**動態建構。

```
const users = ["mary", "nick", "arthur", "sam", "yvette"];
const text = "User @arthur started the backup and 15:15, " +
   "and @nick and @yvette restored it at 18:35.";
const userRegex = new RegExp(`@(?:${users.join('|')})\\b`, 'g');
text.match(userRegex); // [ '@arthur', '@nick', '@yvette' ]
```

此範例等效：`/@(?:mary|nick|arthur|sam|yvette)\b/g`。記得需要用反斜線來轉義字串。

