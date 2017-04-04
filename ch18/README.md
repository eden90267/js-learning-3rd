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

修改內容開始：

- textcontent
- innerHTML