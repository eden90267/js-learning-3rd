# 函式與抽象思考的威力

函式，就像變色龍：在不同的情境中，你對它們會有不同的看法。我們要看的第一個最簡單的觀點，就是重複使用程式的機制。

## 將函式當成副程式

subroutine，一種管理複雜問題的做法。副程式就是將一些重複的功能包起來，給它一個名稱，讓你隨時可藉由那個名稱來執行那些功能。

副程式經常用來包裝**演算法**，它只是一個執行特定工作的方法。

判斷目前日期所屬年份是否為閏年的演算法：

```
const year = new Date().getFullYear();
if (year % 4 !== 0) console.log(`${year} is NOT a leap year.`);
else if (year % 100 !== 0) console.log(`${year} is a leap year.`);
else if (year % 400 !== 0) console.log(`${year} is NOT a leap year.`);
else console.log(`${year} is a leap year.`);
```

建立一個可重複使用的副程式(函式)：

```
function printLeapYearStatus() {
    const year = new Date().getFullYear();
    if (year % 4 !== 0) console.log(`${year} is NOT a leap year.`);
    else if (year % 100 !== 0) console.log(`${year} is a leap year.`);
    else if (year % 400 !== 0) console.log(`${year} is NOT a leap year.`);
    else console.log(`${year} is a leap year.`);
}
```

## 將函式當成會回傳一個值的副程式

```
function isCurrentYearLeapYear() {
    const year = new Date().getFullYear();
    if (year % 4 !== 0) return false;
    else if (year % 100 !== 0) return true;
    else if (year % 400 !== 0) return false;
    else return true;
}

const daysInMonth = [31, isCurrentYearLeapYear() ? 29: 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
if (isCurrentYearLeapYear()) console.log('It is a leap year.');
```

## 將函式當成...函數