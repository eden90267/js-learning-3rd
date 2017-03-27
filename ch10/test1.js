const u1 = {name: 'Cynthia'};
const u2 = {name: 'Jackson'};
const u3 = {name: 'Olive'};
const u4 = {name: 'James'};

const userRoles = new Map();
userRoles.set(u1, 'User')
         .set(u2, 'User')
         .set(u3, 'Admin');

// 也可傳遞陣列的物件
// const userRoles = new Map([
//     [u1, "User"],
//     [u2, "User"],
//     [u3, "Admin"]
// ]);

console.log(userRoles.get(u2));

console.log(userRoles.has(u2));
console.log(userRoles.has(u4));
console.log(userRoles.get(u4));

console.log(userRoles.get(u1));
userRoles.set(u1, 'Admin');
console.log(userRoles.get(u1));

console.log(userRoles.size);