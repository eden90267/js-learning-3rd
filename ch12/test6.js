function* abc() {
    yield 'a';
    yield 'b';
    return 'c';
}


const it = abc();
it.next();        // {value: "a", done: false}
it.next();        // {value: "b", done: false}
it.next();        // {value: "c", done: true}

for (let l of abc()) {
    console.log(l);
}