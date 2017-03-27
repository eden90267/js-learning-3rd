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

如果使用map裡有的鍵來呼叫set()，值會被換掉：

```
userRoles.get(u1);          // "User"
userRoles.set(u1, 'Admin');
userRoles.get(u1);          // "Admin"
```

`size`特性會回傳`map`內的項目數量：

```
userRoles.size;  // 3
```