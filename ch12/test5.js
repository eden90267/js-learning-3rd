function* interrogate() {
    const name = yield "What is your name?";
    const color = yield "What is your favorite color?";
    return `${name}'s favorite color is ${color}`;
}

const it = interrogate();
it.next();       // {value: "What is your name?", done: false}
it.next("Eden"); // {value: "What is your favorite color?", done: false}
it.next("blue"); // {value: "Eden's favorite color is blue", done: true}