function* rainbow() { // 星號將它標成產生器
    yield 'red';
    yield 'orange';
    yield 'yellow';
    yield 'green';
    yield 'blue';
    yield 'indigo';
    yield 'violet';
}

const it = rainbow();
it.next(); // {value: "red", done: false}
it.next(); // {value: "orange", done: false}
it.next(); // {value: "yellow", done: false}
it.next(); // {value: "green", done: false}
it.next(); // {value: "blue", done: false}
it.next(); // {value: "indigo", done: false}
it.next(); // {value: "violet", done: false}
it.next(); // {value: undefined, done: true}

for (let color of rainbow()) {
    console.log(color);
}