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

- 分隔號(|)是標示分支結構的regex中繼字元。
- ig提示忽略大小寫(i)，並全域搜尋(g)。

    如果沒有g，它只會回傳第一個符合的目標。

可將它解讀成：尋找文字area、a、link、script或source的所有實例，忽略大小寫。

area在a前面，因為regex會從左到右執行分支結構。如果a在前面會優先被消化，rea就不符合任何東西了。

這段範例會有意想不到的匹配結果：單字link與非HTML標籤的字母a。

解決問題方式是將regex改為`/<area|<a|<link|<script|<source/`(角括號不是regex中繼字元)。

## 匹配HTML

