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
