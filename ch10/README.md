# Map與Set

ES6加入兩個受歡迎的資料結構：`map`與`set`。

- `map`很像物件，因它可以將一個鍵對應到一個值
- `set`很像陣列，但它無法被複製

## Map

ES6之前，需要鍵值對，會使用物件，因物件可將字串鍵對應至任何型態的物件值。但有許多缺點：

- 因為物件的原型特性，代表可能會對應到意外的東西
- 不容易知道一個物件有多少對應
- 鍵必須是字串or符號，無法將物件對應到值
- 物件不保證特性的順序

`Map`物件可解決這些缺點，且它很適合將鍵對應到值。

e.g. 將使用者物件對應到角色：

```
const u1 = {name: 'Cynthia'};
const u2 = {name: 'Jackson'};
const u3 = {name: 'Olive'};
const u4 = {name: 'James'};

const userRoles = new Map();
userRoles.set(u1, 'User');
userRoles.set(u2, 'User');
userRoles.set(u3, 'Admin');
```

`set()`方法可鏈結：

```
userRoles.set(u1, 'User')
         .set(u2, 'User')
         .set(u3, 'Admin');
```

也可傳遞陣列的陣列給建構式：

```
const userRoles = new Map([
    [u1, "User"],
    [u2, "User"],
    [u3, "Admin"]
]);
```

想知道u2的角色是什麼，可使用`get()`方法：

```
userRoles.get(u2); // "User"
```

呼叫`get`若`map`裡面沒有的鍵，會回傳`undefined`。可使用`has()`來確定有沒有某個鍵：

```
userRoles.has(u2); // true
userRoles.has(u4); // false
userRoles.get(u4); // undefined
```

如果使用`map`裡有的鍵來呼叫`set()`，值會被換掉：

```
userRoles.get(u1);          // "User"
userRoles.set(u1, 'Admin');
userRoles.get(u1);          // "Admin"
```

`size`特性會回傳`map`內的項目數量：

```
userRoles.size;  // 3
```

- 使用`keys()`方法取得`map`內的鍵
- `values()`來回傳值
- `entries()`取得項目陣列

這些方法都會回傳**可迭代的物件**，可用`for...of`迴圈來迭代它。

```
for (let u of userRoles.keys())
  console.log(u.name);

for (let r of userRoles.values())
  console.log(r);

for (let ur of userRoles.entries())
  console.log(`${ur[0].name}: ${ur[1]}`);

// 可使用解構，讓這迭代更自然
for (let [u, r] of userRoles.entries())
  console.log(`${u.name}: ${r}`);

// entries()方法是Map的預設迭代器
// 所以你可以將之前的範例簡化成：
for (let [u, r] of userRoles)
  console.log(`${u.name}: ${r}`);
```

如果需要陣列(而不是可迭代物件)，可使用擴張運算子

```
[...userRoles.values()]
```

要刪除map內的一個項目，可使用delete()方法

```
userRoles.delete(u2);  // true
userRoles.size;        // 2
```

想移除`map`的所有項目，可以用`clear()`方法：

```
userRoles.clear();
userRoles.size     // 0
```

## Weak Map

`WeakMap`與`Map`一模一樣，除了：

- 它的鍵必須是物件
- `WeakMap`的鍵可以被資源回收
- `WeakMap`無法被迭代與清除

一般JavaScript有某個地方參考一個物件，這個物件就會被保存在記憶體裡面。例如一個物件作為一個`Map`的鍵，只要這個`Map`存在，該物件就會一直存在記憶體裡面。但`WeakMap`不是如此。因此，`WeakMap`無法被迭代(在迭代時，將物件曝露在被資源回收的程序中，是很危險的事)

拜`WeakMap`這些特性之賜，你可用它來將私用鍵存在物件實例內：

```
const SecretHolder = (function() {
    const secrets = new WeakMap();
    return class {
        setSecret(secret) {
            secrets.set(this, secret);
        }
        getSecret() {
            return secrets.get(this);
        }
    }
})();

const a = new SecretHolder();
const b = new SecretHolder();

a.setSecret('secret A');
b.setSecret('secret B');

a.getSecret();
b.getSecret();
```

也可使用一般的Map，但如此一來，`SecretHolder`的實例知道的秘密就永遠不會被資源回收了！

## Set

`set`是一組不重複的資料。

```
const roles = new Set();
roles.add("User");
roles.add("Admin");
roles.size;        // 2
roles.add("User"); // 不需要加入某東西之前，先檢查看看它有沒有在集合裡面。
                   // 加入已經在集合內的東西時，將不會發生任何事情。
roles.size;        // 2
```

移除角色，呼叫delete();

```
roles.delete("Admin"); // true
roles;                 // Set ["User"]
roles.delete("Admin"); // false
```

## Weak Set

`weak set`只可以容納物件，且它們容納的物件是可以被資源回收的。與`WeakMap`一樣，`WeakSet`內的值不能迭代，所以很少人使用它。唯一會使用weak set的情況，就是判斷某個物件有沒有在集合內。

聖誕老公公可能有個WeakSet稱為naughty，讓他決定該將煤炭送給誰：

```
const naughty = new WeakSet();

const children = [
    { name: "Suzy" },
    { name: "Derek" }
];

naughty.add(children[1]);

for (let child of children)
    if (naughty.has(child))
        console.log(`Coal for ${child.name}`);
    else
        console.log(`Presents for ${child.name}`);
```