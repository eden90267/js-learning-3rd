# jQuery

jQuery是受歡迎的框架，用途是處理DOM與執行Ajax請求。DOM API無法做的事，jQuery就沒辦法做(jQuery是建構在DOM API之上)。它提供三個主要好處:

- jQuery能免於擔心不同瀏覽器有不同DOM API實作方式
- jQuery提供較簡單的Ajax API
- jQuery對內建的DOM API進行許多強大且扎實的改善

## 萬能的金錢(符號)

"將錢號視為識別碼"的程式庫。

※ 如果jQuery的$與其他程式庫有衝突，可防止jQuery使用$，見jQuery.noConflict。

## 加入jQuery

CDN方式：

- 3.x snippet:

    `<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>`

- 2.x snippet:

    `<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>`

    不再支援IE 6、7與8。需要請用1.x版。2.x是被視為較精簡的版本。

- 1.x snippet:

    `<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>`

## 等待DOM載入

```
$(document).ready(function() {
  // 這裡的程式會在所有HTML都已經被載入，
  // 且DOM已建構完成之後才執行
});
```

可安全地使用這個技術很多次，這可讓你將jQuery程式放在不同地方，同時可安全地等待DOM載入。另外也有簡便版本：

```
$(function() {
  // 這裡的程式會在所有HTML都已經被載入，
  // 且DOM已建構完成之後才執行
});
```

## 用jQuery包裝的DOM元素

以jQuery來操作DOM，主要使用以jQuery包裝的DOM元素。所有以jQuery來操作DOM的技術，都是先從建立一個jQuery物件開始。"包裝"一個DOM元素集合(可以是空的，或只有一個元素)開始。

jQuery函式會建立一個jQuery包裝的DOM元素集合。呼叫jQuery函式的方式主要有兩種：CSS選擇器，或HTML。

```
const $paras = $('p');
typeof $paras;            // "object"
$paras instanceof $;      // true
$paras instanceof jQuery; // true
```

用HTML呼叫jQuery，會根據你提供的HTML來建立一個新的DOM元素(類似當你設定元素的innerHTML產生的結果):

```
const $newPara = $('<p>Newly created paragraph...</p>');
```

## 操作元素

jQuery可以讓你很輕鬆添加與移除內容。

jQuery提供text與html方法，大致相當DOM元素的textContent與innerHTML:

```
$('p').text('ALL PARAGRAPHS REPLACED');
```

```
$('p').html('<i>ALL</i> PARAGRAPHS REPLACED');
```

jQuery可讓你輕鬆同時操作多個元素。它會假設你想對jQuery物件裡面的每一個元素採取行動。如果想要些改第三段?jQuery提供一個方法`eq`，它會回傳一個新的jQuery物件，裡面有一個元素。

```
$('p')     // 匹配所有段落
    .eq(2) // 第三段
    .html('<i>THIRD</i> PARAGRAPH REPLACED');
```

要移除元素：呼叫jQuery物件的remove即可。要移除所有段落：

```
$('p').remove();
```

jQuery開發的重要做法：**鏈結**。所有jQuery物件都會回傳一個jQuery物件，可讓你**鏈結**呼叫式。

jQuery提供許多加入新內容的方法。其中一個是`append`。它會將你提供的內容附加到jQuery物件內的每一個元素。

每個段落中加入註腳：

```
$('p')
    .append('<sup>*</sup>');
```

append會對符合的元素加入一個子節點，也可在他之前或之後插入**同層**節點：

```
$('p')
    .after('<hr>')
    .before('<hr>');
```

插入方法也包括`appendTo`、`insertBefore`與`insertAfter`，他們在一些情況下很好用：

```
$('<sup>*</sup>').appendTo('p'); // 相當$('p').append('<sup>*</sup>')
$('<hr>').insertBefore('p');     // 相當$('p').before('<hr>')
$('<hr>').insertAfter('p');      // 相當$('p').after('<hr>')
```

jQuery也可以讓你非常輕鬆修改元素樣式。`addClass`、`removeClass`來加入與移除類別，或用toggleClass切換類別(沒有加入，有移除)。也可用`css`直接操作樣式。

可用:even與:odd選擇器，讓你選擇其他的元素。

```
$('p').css('color', 'red');
```

jQuery鏈結，有時需要選擇符合條件的元素子集合

- `eq`：將jQuery物件減少為一個元素
- `filter`：將集合減少，只剩下符合指定的選擇器的元素

    ```
    $('p')
        .after('<hr>')
        .append('<sup>*</sup>')
        .filter(':odd')
        .css('color', 'red');
    ```

- `not`：是filter的相反

    ```
    $('p')
        .after('<hr>')
        .not('.highlight')
        .css('margin-left', '20px');
    ```

- `find`：回傳指定查詢條件的元素的**後代**集合(與`filter`相反，它會篩選既有的元素)。

    ```
    $('p')
        .before('<hr>')
        .find('.code')
        .css('font-size', '30px');
    ```

## 展開jQuery物件

如果"需要"展開jQuery物件(來存取底層的DOM元素)，可用`get`方法來做。

```
const para2 = $('p').get(1);
```

```
const paras = $('p').get();
```

## Ajax

jQuery提供一些方便的方法來讓你更容易使用Ajax呼叫。jQuery公開一種ajax方法，可讓你精細地控制Ajax呼叫。它也提供一些方便的方法：get與post，來執行最常見的Ajax呼叫型態。雖然這些方法都提供回呼，但它們也會回傳promise，建議用這種方式來處理伺服器回應：

用get改寫之前的refreshServerInfo範例：

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
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
    <script>
        function refreshServerInfo() {
            const $serverInfo = $('.serverInfo');
            $.get('http://127.0.0.1:7070').then(
                function(data) {
                    Object.keys(data).forEach(p => {
                        $(`[data-replace="${p}"]`).text(data[p]);
                    });
                },
                function(jqXHR, textStatus, err) {
                    console.err(err);
                    $serverInfo.addClass('error').html('Error connecting to server');
                }
            )
        }
        $(function() {
            refreshServerInfo();
            // setInterval(refreshServerInfo(), 200);
        });  
    </script>
</body>

</html>
```