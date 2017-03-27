# 例外與錯誤處理

**例外處理**，是一種機制，它會以管制的方式來處理錯誤。之所以稱為例外處理，目的是為了處理例外的情況，是非預期的錯誤。

- 表單中填入無效的email地址是一種**預期中的錯誤**：人們經常打錯字。
- **意外的錯誤**可能包括：沒有磁碟空間，或以前可靠的服務變成無法使用。

## Error物件

JavaScript有一種內建的`Error`物件，它很適合用來處理任何種類的錯誤(例外或預期)。可在建立一個Error實例時提供一個錯誤訊息：

```
const err = new Error(`invalid email`);
```

一個負責驗證email地址的函式，如果函式驗證成功，會回傳email地址的字串。如果沒有，它會回傳Error的實例。

```
function validateEmail(email) {
    return email.match(/@/) ?
        email :
        new Error(`Invalid email: ${email}`);
}


const email = "jane@doe.com";

const validatedEmail = validateEmail(email);
if (validatedEmail instanceof Error) {
    console.error(`Error: ${validatedEmail.message}`);
} else {
    console.log(`Valid email: ${validatedEmail}`);
}
```

雖然使用`Error`實例是有效且實用的方式，但它通常會被用來處理**例外**。

## 使用try與catch來處理例外

`try...catch`陳述式處理例外。

```
const email = null;

try {
    const validatedEmail = validateEmail(email);
    if (validatedEmail instanceof Error) {
        console.error(`Error: ${validatedEmail.message}`);
    } else {
        console.log(`Valid email: ${validatedEmail}`);
    }
} catch (err) {
    console.error(`Error: ${err.message}`);
}
```

我們抓到錯誤了，程式不會停擺一我們會記下錯誤，並繼續執行。

只要錯誤出現，控制權就會轉移到`catch`區塊。

## 丟出錯誤

可以自己“丟出”錯誤，它會引發例外處理機制。在JavaScript中，可以丟出任意值，但傳統做法是丟出`Error`實例。大部分的`catch`區塊都期望看到`Error`的實例。

```
function billPay(amount, payee, account) {
    if (amount > account.balance) {
        throw new Error("insufficient funds");
    }
    account.transfer(payee, amount);
}
```

呼叫`throw`時，目前函式會立刻停止執行(`account.transfer`不會被呼叫)。

## 例外處理與呼叫堆疊

函式a呼叫函式b，函式b呼叫函式c，當c執行時，a與b都還沒完成任務。這種未完成的函式嵌套稱為**呼叫堆疊**。

如果c有個錯誤，就會在b產生一個錯誤，接著造成a裡面的錯誤。基本上，錯誤會在呼叫堆疊中往上傳播，直到它被捕捉為止。

如果錯誤沒有被抓到，JavaScript解譯器會毫不客氣停止你的程式。這稱為**未處理的例外**，或**未捕獲的例外**，它會讓程式當機。

大部分JavaScript版本中，`Error`實例裡面有一個stack特性。它會用字串來表示堆疊(非標準的JavaScript功能)

```
function a() {
    console.log('a: calling b');
    b();
    console.log('a:done');
}

function b() {
    console.log('b: calling c');
    c();
    console.log('b:done');
}

function c() {
    console.log('c: throwing error');
    throw new Error('c error');
    console.log('c:done');
}

function d() {
    console.log('d: calling c');
    c();
    console.log('d:done');
}

try {
    a();
} catch (err) {
    console.log(err.stack);
}

try {
    d();
} catch (err) {
    console.log(err.stack)
}
```

在firefox執行，會產生以下輸出：

```
a: calling b 
b: calling c 
c: throwing error 
c@debugger eval code:15:11
b@debugger eval code:9:5
a@debugger eval code:3:5
@debugger eval code:26:5
 
d: calling c 
c: throwing error 
c@debugger eval code:15:11
d@debugger eval code:21:5
@debugger eval code:32:5
```

有@符號的是堆疊追蹤(stack trace)，結束的地方，完全沒函式。可明顯看到兩個不同的堆疊追蹤。

## try...catch...finally

有時`try`區塊內的程式與某種資源有關(檔案處理與HTTP連結)，無論有沒有錯誤，都希望可以釋放這些資源。`finally`就最適合做這件事。

```
try {
    console.log("this line is executed");
    throw new Error("whoops");
    console.log("this line is not...");
} catch(err) {
    console.log("there was an error");
} finally {
    console.log("...always executed");
    console.log("perform cleanup here");
}
```

輸出：

```
this line is executed 
there was an error 
...always executed 
perform cleanup here
```

## 總結

例外會消耗一些計算成本。因為例外必須“解開”堆疊追蹤，直到遇到catch區塊為止。所以JavaScript必須做額外的整理工作。

請記得，每當你丟出例外，你就必須補捉它。

最佳做法是將例外當成最後一道防線，來處理無法預期的例外錯誤，以及用流程控制陳述式來管理預期的錯誤。