const obj = { foo: 'bar' };
Object.defineProperty(obj, 'foo', {writable: false});
console.log(Object.getOwnPropertyDescriptor(obj, 'foo'));

obj.foo = 3;
console.log(`obj.foo: ${obj.foo}`); // 賦值不會成功；嚴格模式下會報TypeError錯誤。


Object.defineProperty(obj, 'color', {
    get: function() { return this.color; },
    set: function(value) { this.color = value; }
});

Object.defineProperty(obj, 'name', {
    value: 'Cynthia',
});
Object.defineProperty(obj, 'greet', {
    value: function() { return `Hello, my name is ${this.name}!`; }
});