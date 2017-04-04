# 瀏覽器中的JavaScript

## ES5或ES6

伺服器端，可清楚知道它提供哪些ES6功能。在Web端，你要透過HTTP(S)傳送珍貴的程式給乙太網路，這些程式會被一些無法控制的JavaScript引擎執行。

除非可在某種程度上控制使用者的環境，否則在可見的未來，你都必須使用ES5。現在仍可透過轉譯來解決這問題。雖部署與除錯比較痛苦，但這是進步的代價。

## 文件物件模型

**文件物件模型**或**DOM**是一種描述HTML文件結構的公約，他也是與瀏覽器互動的核心。

概念上，DOM是個樹狀結構。樹是由**節點**組成的：每個節點都有一個**父節點**(除根節點)與零或多個**子節點**。根節點是**文件**，由一個子節點組成，也就是`<html>`元素，`<html>`元素有兩個子節點：`<head>`元素與`<body>`元素。

在DOM樹中每個節點(包括文件本身)都是一個Node類別的實例。Node物件有一個parentNode與childNodes特性，以及識別特性，例如：nodeName與nodeType。

DOM節點：

- HTML元素節點
- 文字節點

每個節點都有特性nodeType與nodeName(及其他)。

nodeType是一個整數，用來辨識節點的型態是什麼。Node物件裡面有對應這些數字的常數。主要處理的節點型態是Node.ELEMENT_NODE(HTML元素)與Node.TEXT_NODE(文字內容，通常在HTML元素裡面)。

編寫一個函式來遍歷整個DOM，並將它印到主控台：

```
function printDOM(node, prefix) {
    console.log(prefix + node.nodeName);
    for (let i = 0; i < node.childNodes.length; i++) {
        printDOM(node.childNodes[i], prefix + '\t');
    }
}
printDOM(document, '');
```

樹狀結構深度優先前序遍歷，也就是說，它會一路順著分支往下走，再前往下一個分支。

但它是繁瑣、效能低下的HTML操作方式。幸運的是，DOM有些方法可更直接地找到HTML元素。

可使用DOM API TreeWalker物件，可讓你迭代DOM中的所有元素(可選擇過濾某些元素型態)。

## 樹狀結構術語

- 節點的父節點是它的**直接**父系(也就是，不是“祖父”)
- 子節點是**直接**子節點(不是“孫”)
- **後代**(descendant)一詞指的是子，或子的子，或以此類推
- **上層**(ancestor)指的是父、父的父，以此類推

## DOM的“取得”方法

DOM提供一些“取得”方法讓你可快速找到特定HTML元素。

- `document.getElementById`
- `document.getElementsByClassName`
- `document.getElementByTagName`

所有回傳集合的DOM方法都不會回傳JavaScript陣列，而是`HTMLCollection`的實例，它是一個類似陣列的物件。可以使用for迴圈來迭代它，但`Array.prototype`方法不行(e.g. `map`、`filter`與`reduce`)。可用擴張運算子來將HTMLCollection轉換成陣列：`[...document.getElementsByTagName(p)]`。

## 查詢DOM元素

有更通用的方法，不但可用單一條件來找出元素，也可用元素與其他元素的關係來尋找。document方法`querySelector`與`querySelectorAll`可讓你使用**CSS選擇器**。

## 操作DOM元素

從修改內容開始：

- textcontent：去除所有HTML標籤，僅提供文字資料
- innerHTML：可讓你建立HTML(產生新的DOM節點)

```
const para1 = document.getElementsByTagName('p')[0];
para1.textContent;  // "This is a simple HTML file."
para1.innerHTML;    // "This is a <i>simple</i> HTML file."
para1.textContent = "Modified HTML file";
para1.innerHTML = "<i>Modified</i> HTML file";
```

執行textContent與innerHTML是一種**破壞性**的動作，它會將元素中的東西換掉，無論它多大或多複雜。

## 建立新的DOM元素

已看過設定元素的`innerHTML`特性來暗中建立新的DOM節點。也可使用`document.createElement`來明確建立新的節點。這函式會建立一個新的元素，但它不會加到DOM裡，必須採取另一動作來做這件事。

```
const p1 = document.createElement('p');
const p2 = document.createElement('p');
p1.textContent = "I was created dynamically!";
p2.textContent = "I was alse created dynamically!";
```

將新建立元素加至DOM，我們要使用`insertBefore`與`appendChild`方法。需取得DOM父元素參考與它第一個子元素：

```
const parent = document.getElementById('content');
const firstChild = parent.childNodes[0];

parent.insertBefore(p1, firstChild);
parent.appendChild(p2);
```

`insertBefore`會先接收要插入的元素，接著是一個“參考節點”，我們要在它前面插入。

`appendChild`會將指定的元素附加為最後一個子節點。

## 造型元素

DOM API可完全控制元素造型的細節。但，使用CSS類別是比較好的做法，而非修改各個元素的特性。

每個元素都有一個classList特性，裡面包含該元素的所有類別(如果有的話)。classList有個add與remove方法。

```
.highlight {
  background: #ff0;
  font-style: italic;
}
```
想突出顯示含有

```
function highlightParas(containing) {
  if (typeof containing === 'string')
    containing = new RegExp(`\\b${containing}\\b`, 'i');
  const paras = document.getElementsByTagName('p');
  console.log(paras);
  for(let p of paras) {
    if (!containing.test(p.textContent)) continue;
    p.classList.add('highlight');
  }
}
highlightParas('unique');
```

想移除凸顯，可用classList.remove：

```
function removeParaHighlights() {
    const paras = document.querySelectorAll('p.highlight');
    for(let p of paras) {
        p.classList.remove('highlight');
    }
}
```

也可直接對p段落刪除，如果該元素沒有該類別，它不會做任何事。但執行查詢會是比較安全的做法。

## 資料屬性

HTML5加入**資料屬性**，它不會被瀏覽器顯示，而是容易被JavaScript讀取與修改的元素添加資訊。

```
<button data-action="highlight" data-containing="unique">
    Highlight paragraphs containing "unique"
</button>
<button data-action="removeHighlights">
    Remove highlights
</button>
```

```
const highlightActions = document.querySelectorAll('[data-action=highlight]');
```

highlightActions內其中一個元素，可以看到它有一個dataset特性。

```
highlightActions[0].dataset; // DOMStringMap {action: "highlight", containing: "unique"}
```

DOM API會將資料屬性存成字串(如同類別DOMStringMap)，你無法儲存物件資料。(jQuery擴充資料屬性功能除外)

也可用JavaScript來修改或添加資料屬性：

```
highlightActions[0].dataset.containing = "giraffe";
highlightActions[0].dataset.caseSensitive = "true";
```

## 事件

DOM API描述大約200個事件。這裡用最容易了解的事件開始：click。

```
const highlightActions = document.querySelectorAll('[data-action=highlight]');
for (let a of highlightActions) {
    a.addEventListener('click', evt => {
        evt.preventDefault();
        highlightParas(a.dataset.containing);
    });
}

const removeHighlightActions =
    document.querySelectorAll('[data-action=removeHighlights]');
for (let a of removeHighlightActions) {
    a.addEventListener('click', evt => {
        evt.preventDefault();
        removeParaHighlights();
    })
}
```

每個元素都有一個addEventListener方法。evt引數是該事件的**型態專屬的資訊**。例如，click事件具特性clientX與clientY，它們可告訴使用者按下的地方，以及target，它是發出click事件的元素。

許多事件都有預設的處理器，若要防止這種行為，對事件物件呼叫`preventDefault()`。大部分你寫的事件處理器都會呼叫`preventDefault()`(除非你明確想要做一些預設處理器**之外**的事情)。

### 捕捉事件與事件反昇

因HTML是階層結構，所以事件可能會在許多地方處理。例如，如果你按下按鈕，按鈕本身可以處理事件，按鈕的上一代，上一代的上一代也可以。許多元素都有機會處理事件，問題是“各個元素有機會回應事件的順序是什麼？”

基本上，有兩個選項：

- 從最遙遠的上層開始。這稱為**捕捉**。
- 發生事件的元素開始，在階層中往上前進，所以所有上層都有機會回應。這稱為**反昇**(bubbling)

為了支援這兩種選項，HTML5事件的傳遞，可讓處理器捕捉事件(從最遙遠的上層開始，並往下前進，到目標元素)，接著事件會從目標元素反昇到最遙遠的祖系。

任何處理器都可以選擇三件事之一，來影響另外呼叫處理器的方式(以及是否呼叫)。

- `preventDefault`，它會**取消**事件。被取消的事件會繼續傳播，但它們的`defaultPrevented`特性會被設為`true`。瀏覽器內建的事件處理器會尊重`defaultPrevented`特性，不採取行動。你編寫的事件處理器可以(且通常會)選擇忽視這個特性。
- `stopPropagation`，它會阻止傳播至目前的元素之外的元素(所有被指派給目前元素的處理器都會被呼叫，但被指派給其他元素的處理器不會)
- `stopImmediatePropagation`會防止呼叫任何其他的處理器(就算他們是目前的元素的)

範例：

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Event Propagation</title>
</head>
<body>
    <div>
        <button>Click Me!</button>
    </div>
    <script>

        // 這會建立一個事件處理器並回傳它
        function logEvent(handlerName, type, cancel, stop, stopImmeduate) {
            // 這是實際的事件處理器
            return function(evt) {
                if (cancel) evt.preventDefault();
                if (stop) evt.stopPropagation();
                if (stopImmeduate) evt.stopImmediatePropagation();
                console.log(`${type}: ${handlerName}` +
                    (evt.defaultPrevented ? ' (canceled)' : ''));
            }
        }

        // 這會將一個事件記錄器加到元素
        function addEventLogger(elt, type, action) {
            const capture = type === 'capture';
            elt.addEventListener('click', 
            logEvent(elt.tagName, type, action === 'cancel', action==='stop', action==='stop!'),
            capture);
        }

        const body = document.querySelector('body');
        const div = document.querySelector('div');
        const button = document.querySelector('button');

        // addEventLogger(body, 'capture');
        // addEventLogger(body, 'bubble');
        // addEventLogger(div, 'capture');
        // addEventLogger(div, 'bubble');
        // addEventLogger(button, 'capture');
        // addEventLogger(button, 'bubble');
        // 主控台：
        // capture: BODY
        // capture: DIV
        // capture: BUTTON
        // bubble: BUTTON
        // bubble: DIV
        // bubble: BODY
        // 處理器會按照加入的順序呼叫。捕捉與反昇。

        // 接著我們取消傳播
        // addEventLogger(body, 'capture');
        // addEventLogger(body, 'bubble');
        // addEventLogger(div, 'capture', 'cancel');
        // addEventLogger(div, 'bubble');
        // addEventLogger(button, 'capture');
        // addEventLogger(button, 'bubble');
        // 主控台：
        // capture: BODY
        // capture: DIV (canceled)
        // capture: BUTTON (canceled)
        // bubble: BUTTON (canceled)
        // bubble: DIV (canceled)
        // bubble: BODY (canceled)
        // 可看到傳播繼續進行，但事件會被標成canceled

        // <button> capture停止傳播：
        // addEventLogger(body, 'capture');
        // addEventLogger(body, 'bubble');
        // addEventLogger(div, 'capture', 'cancel');
        // addEventLogger(div, 'bubble');
        // addEventLogger(button, 'capture', 'stop');
        // addEventLogger(button, 'bubble');
        // 控制台：
        // capture: BODY
        // capture: DIV (canceled)
        // capture: BUTTON (canceled)
        // bubble: BUTTON (canceled)
        // 可看到傳播在<button>事件之後停止。<button>bubble事件仍會觸發，只是capture會先觸發，再停止傳播。
        // <div>與<body>元素不會收到他們的反昇事件。

        // 最後，在<button>capture立刻停止：
        addEventLogger(body, 'capture');
        addEventLogger(body, 'bubble');
        addEventLogger(div, 'capture', 'cancel');
        addEventLogger(div, 'bubble');
        addEventLogger(button, 'capture', 'stop!');
        addEventLogger(button, 'bubble');
        // 主控台：
        // capture: BODY
        // capture: DIV (canceled)
        // capture: BUTTON (canceled)
        // 可以看到傳播會在<button>capture完全停止，不會有進一步的傳播
    </script>
</body>
</html>
```

addEventListener改成使用一種古老的方式來添加事件：使用“on”特性。例如

`elt.onclick = function(evt){ /* handler */ }`

來將click處理器加到元素。這種方法缺點是，它一次只能註冊一個處理器。

### 事件種類

#### 拖曳事件

dragstart、drag、dragend、drop及其它事件來實作拖曳並放下的介面。

#### 聚焦事件

使用者與可編輯的元素互動，採取行動。focus、blur、change事件。

#### 表單事件

當使用者提交表單(Submit按鈕，或在正確地方按下Enter)，表單會發出submit事件。

#### 輸入設備事件

click，除此之外還有其他的滑鼠事件(mousedown、move、mouseup、mouseenter、mouseleave、mouseover、mousewheel)與鍵盤事件(keydown、keypress、keyup)。留意，“觸控”的優先權比滑鼠事件高，但如果觸控事件沒被處理，就會產生滑鼠事件。

#### 媒體事件

讓你追蹤使用者與HTML5視訊及音訊播放器的互動(暫停、播放等等)。

#### 進度事件

通知你瀏覽器的進度載入內容。最常見的是load，它會在瀏覽器載入元素與它的所有相關資源時觸發。error也很實用，可讓你在元素不可使用時採取行動(例如，壞掉的圖像連結)。

#### 觸控事件

觸控事件完善地支援可以觸控的設備。它允許多個同時發生的觸按(尋找事件中的touches特性)，可處理精細的觸碰動作，例如支援手勢(捏合、拂動等等)。

## Ajax

Ajax可與伺服器進行非同步通訊，可用來自伺服器的資料更新網頁的元素，而不需要重載整個網頁。在2000年代初期的XMLHttpRequest物件問世後才有可能實現，並開創“web 2.0”。

Ajax核心概念：

瀏覽器的JavaScript會對伺服器發出HTTP請求，伺服器回傳資料，通常是JSON格式(在JavaScript中，它比XML好用多了)。那個資料會被用來啟用瀏覽器功能。

```
const http = require('http');

const server = http.createServer(function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(JSON.stringify({
        platform: process.platform,
        nodeVersion: process.version,
        uptime: Math.round(process.uptime()),
    }));
});

const port = 7070;
server.listen(port, function() {
    console.log(`Ajax server started on port ${port}`);
});
```

這會建立一個簡單的伺服器，會回報平台與伺服器運行時間。

※ Ajax有一種功能可能導致資訊安全漏洞，稱為跨來源資源共享(cross-origin resource sharing, CORS)。header `Access-Control-Allow-Origin: *`，可提示用戶端(browser)不要因為安全的考量而防止呼叫。展示的目的，才安全地停用。

啟動伺服器：

```
$ babel-node ajaxServer
```

```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Ajax Client</title>
</head>

<body>
    <div class="serverInfo">
        Server is running on <span data-replace="platform">???</span> With Node <span data-replace="nodeVersion">???</span>.
        It has been up for <span data-replace="uptime">???</span> seconds.
    </div>
    <script>
        function refreshServerInfo() {
            const req = new XMLHttpRequest();
            req.addEventListener('load', function() { // load：ajax呼叫成功，會呼叫的東西
                // 待辦：將這些值放至HTML
                console.log(this.responseText);
            });
            req.open('GET', 'http://127.0.0.1:7070', true);
            req.send(); // 會實際執行請求

        }
        refreshServerInfo();
    </script>
</body>

</html>
```

下一步就是將資料插入HTML

```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Ajax Client</title>
</head>

<body>
    <div class="serverInfo">
        Server is running on <span data-replace="platform">???</span> With Node <span data-replace="nodeVersion">???</span>.
        It has been up for <span data-replace="uptime">???</span> seconds.
    </div>
    <script>
        function refreshServerInfo() {
            const req = new XMLHttpRequest();
            req.addEventListener('load', function() { // load：ajax呼叫成功，會呼叫的東西
                const data = JSON.parse(this.responseText);

                const serverInfo = document.querySelector('.serverInfo');

                Object.keys(data).forEach(p => {
                   const replacements = serverInfo.querySelectorAll(`[data-replace="${p}"]`);
                   for(let r of replacements) {
                       r.textContent = data[p];
                   }
                });
            });
            req.open('GET', 'http://127.0.0.1:7070', true);
            req.send(); // 會實際執行請求

        }
        refreshServerInfo();
        // setInterval(refreshServerInfo(), 200);
    </script>
</body>

</html>
```